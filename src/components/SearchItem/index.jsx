import React, { useEffect, useState, useRef } from "react";
import { AutoComplete, Input, Space, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { crud } from "@/redux/crud/actions";
import { request } from "@/request";
import { selectSearchedItems } from "@/redux/crud/selectors";

import { Empty } from "antd";

export default function SearchItem({ config }) {
  let { entity, searchConfig, onSelect } = config;

  const { displayLabels, searchFields, outputValue = "_id" } = searchConfig;
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);

  let source = request.source();
  const { result, isLoading, isSuccess } = useSelector(selectSearchedItems);

  const isTyping = useRef(false);

  let delayTimer = null;
  useEffect(() => {
    isLoading &&
      setOptions([
        {
          label: (
            <Space align="center">
              <Spin />
              Searching
            </Space>
          ),
        },
      ]);
  }, [isLoading]);
  const onSearch = (searchText) => {
    isTyping.current = true;

    clearTimeout(delayTimer);
    delayTimer = setTimeout(function () {
      if (isTyping.current && searchText !== "") {
        dispatch(
          crud.search(entity, source, {
            question: searchText,
            fields: searchFields,
          })
        );
      }
      isTyping.current = false;
    }, 700);
  };

  const onChange = (data) => {
    const currentItem = options.find((item) => {
      return item.value === data;
    });
    const currentValue = currentItem ? currentItem.label : data;
    setValue(currentValue);
  };

  useEffect(() => {
    let optionResults = [];

    result.map((item) => {
      const labels = displayLabels.map((x) => item[x]).join(" ");
      optionResults.push({ label: labels, value: item[outputValue] });
    });

    setOptions(optionResults);
  }, [result]);

  return (
    <AutoComplete
      value={value}
      options={options}
      style={{
        width: "100%",
      }}
      onSelect={onSelect}
      onSearch={onSearch}
      onChange={onChange}
      notFoundContent={!isSuccess ? <Empty /> : ""}
      allowClear={true}
      placeholder="Search Items"
    >
      <Input suffix={<SearchOutlined />} clearableInput />
    </AutoComplete>
  );
}
