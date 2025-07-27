 import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function RTE({ value, onChange, label }) {
  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}

      <div className="border rounded p-2"/>
       return (
<Editor
  apiKey="ra6ybk6yp4vcqylg2ala1uledq38a4zb9rsc7em3wa4ysl60" // ✅ Add your TinyMCE API Key here
  value={value}
  onEditorChange={onChange}
  init={{
    height: 500,
    menubar: true,
    plugins: [
      "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
      "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
      "insertdatetime", "media", "table", "help", "wordcount"
    ],
    toolbar:
      "undo redo | formatselect | " +
      "bold italic underline | alignleft aligncenter alignright alignjustify | " +
      "bullist numlist outdent indent | removeformat | help",
    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
  }}
/>
</div>


       )
  
}
