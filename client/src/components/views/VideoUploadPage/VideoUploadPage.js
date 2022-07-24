import React, { useState } from "react";
import { Typography, Button, Form, message, Input } from "antd";
import Dropzone from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";
import { Axios } from "axios";

const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
  { vlaue: 0, label: "Private" },
  { value: 1, label: "Public" },
];

const CategoryOptions = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" },
];



function VideoUploadPage() {
  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState("Film & Animation");

  const onTitleChange = (e) => {
    setVideoTitle(e.currentTarget.value)
  }

  const onDescriptionChange = (e) =>{
    setDescription(e.currentTarget.value)
  }

  const onPrivateChange = (e) =>{
    setPrivate(e.currentTarget.value)
  }
  const onCategoryChange = (e) =>{
    setCategory(e.currentTarget.value)
  }

  const onDrop = (files) => {
    let formDate = new FormData;
    const config = {
      header: {'content-type': 'multipart/form-data'}
    }
    formDate.append("file", files[0])

    console.log(files)
    Axios.append('/api/video/uploadfiles', formDate, config)
      .then(response => {
        if(response.data.success) {

        } else {
          alert('업로드를 실패했습니다.')
        }
      })

  }

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBotton: "2rem" }}>
        <Title level={2}>Upload Video</Title>
      </div>
      <br /><br />
      <Form onSubmit>
        <div style={{ display: "flex", justifyContent: "spase-between" }}>
          {/* Drop zone */}

          <Dropzone
            onDrop={onDrop}
            multiple={false}
            maxSize={100000000}
            >
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "2px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor:'pointer'
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <PlusOutlined style={{ fontSize: '2rem'}} />
              </div>
            )}
          </Dropzone>
          {/* Thumbnil */}
          <div>
            <img src alt />
          </div>
        </div>

        <br />
        <br />
        <label>Title</label>
        <br />
        <Input 
          onChange={onTitleChange} 
          value={VideoTitle} />

        <br />
        <br />

        <label>Description</label>
        <br />
        <TextArea 
          onChange={onDescriptionChange}
          value={Description} />

        <br />
        <br />

        <select 
        onChange={onPrivateChange}>
          {PrivateOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <br />
        <br />
        <select 
        onChange={onCategoryChange}>
          {CategoryOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />

        <Button type="primary" size="large" onClick>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default VideoUploadPage;
