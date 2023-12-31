/*
 *
 * HomePage
 *
 */

import React, { memo, useState } from "react";
import { Message, Uploader, useToaster } from "rsuite";
import * as XLSX from "xlsx";
import { fetchAllText, postNewData, updateAllText } from "./action";

const HomePage = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [fileName, setFileName] = useState("");

  const toaster = useToaster();

  const message = (label, type) => (
    <Message showIcon type={type}>{label}</Message>
  );

  const handleUpload = async (data) => {
    let reader = new FileReader();
    reader.readAsArrayBuffer(data.blobFile);
    if(String(data.name).includes(".xls")){
      reader.onload = (e) => {
        setFileName(data.name);
        setExcelFile(e.target.result);
        toaster.push(message("Uploaded", "success"))
      };
    } else {
      toaster.push(message("It is not excel file", "error"))
      setFileName("");
    }
  };

  const handleGenerate = () => {
    const workbook = XLSX.read(excelFile, { type: "buffer" });
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    if(data?.length > 0 && Array.isArray(data)){
      const tempData = [];
      data.forEach((v) => {
        if(v.title && v.english && v.indonesia && (/^[a-z0-9_]+$/).test(String(v.title))){
          tempData.push({title: v.title, english: v.english, indonesia: v.indonesia})
        }
      }) 
      setExcelData(tempData);
    }
  };

  const handleApply = async () => {
    let payload = { data_text: [...excelData] };
    if(confirm("Are you sure you want to update the 'text' data with this data?")){
      const resp = await updateAllText(payload);
      if(resp.status == 200 || resp.status == 201){
        toaster.push(message("Applied", "success"))
      } else {
        toaster.push(message("Failed", "error"))
      }
    }
  };

  return (
    <div style={{ padding: 24, color: "black" }}>
      <Uploader
        accept=".xlsx,.xls"
        draggable
        fileListVisible={false}
        onUpload={handleUpload}
      >
        <div style={{padding: 75}}>
          Click or Drag files to this area to upload<br />
          (your table header must only have columns named "title", "english", and "indonesia")
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
            style={{ margin: 8 }}
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
              if(k < 20){
                return (
                  <tr key={k}>
                    <th scope="row">{k + 1}</th>
                    <td>{v.title}</td>
                    <td>{v.english?.length < 16 ? v.english : v.english.substr(0, 16) + '...'}</td>
                    <td>{v.indonesia?.length < 16 ? v.indonesia : v.indonesia.substr(0, 16) + '...'}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      )}
      {excelData?.length > 20 && <div>showing only 20 of {excelData.length} data</div>}
      {excelData?.length > 0 && <button
        type="button"
        className="btn btn-success"
        onClick={handleApply}
        style={{ marginTop: 8 }}
      >
        Apply
      </button>}
    </div>
  );
};

export default memo(HomePage);
