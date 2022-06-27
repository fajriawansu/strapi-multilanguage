/*
 *
 * HomePage
 *
 */

import React, { memo, useState } from "react";
import { Uploader } from "rsuite";
import * as XLSX from "xlsx";

import pluginId from "../../pluginId";
import { fetchAllText, postNewData, updateAllText } from "./action";

const HomePage = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [fileName, setFileName] = useState("");

  const handleUpload = async (data) => {
    let reader = new FileReader();
    reader.readAsArrayBuffer(data.blobFile);
    setFileName(data.name);
    reader.onload = (e) => {
      setExcelFile(e.target.result);
    };
  };

  const handleGenerate = () => {
    const workbook = XLSX.read(excelFile, { type: "buffer" });
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    if(data?.length > 0 && Array.isArray(data)){
      const tempData = [];
      data.forEach((v) => {
        if(v.title && v.english && v.indonesia){
          tempData.push({title: v.title, english: v.english, indonesia: v.indonesia})
        }
      }) 
      setExcelData(tempData);
    }
  };

  const handleApply = async () => {
    let payload = { data_text: [...excelData] };
    const resp = await updateAllText(payload);
    console.log(resp);
  };

  return (
    <div style={{ padding: 24, color: "black" }}>
      <Uploader
        accept=".xlsx,.xls"
        draggable
        fileListVisible={false}
        onUpload={handleUpload}
      >
        <div style={{ lineHeight: "200px" }}>
          Click or Drag files to this area to upload
        </div>
      </Uploader>
      {fileName && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ marginTop: 24 }}
        >
          <div>{fileName}</div>
          <button
            disabled={!excelFile}
            type="button"
            className="btn btn-success btn-sm"
            onClick={handleGenerate}
            style={{ marginLeft: 8 }}
          >
            Generate File
          </button>
        </div>
      )}
      {excelData?.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Number</th>
              <th scope="col">Title</th>
              <th scope="col">English</th>
              <th scope="col">Indonesia</th>
            </tr>
          </thead>
          <tbody>
            {excelData.map((v, k) => {
              return (
                <tr key={k}>
                  <th scope="row">{k + 1}</th>
                  <td>{v.title}</td>
                  <td>{v.english}</td>
                  <td>{v.indonesia}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {excelData?.length > 0 && <button
        type="button"
        className="btn btn-success btn-lg"
        onClick={handleApply}
        style={{ marginLeft: 8 }}
      >
        Apply
      </button>}
    </div>
  );
};

export default memo(HomePage);
