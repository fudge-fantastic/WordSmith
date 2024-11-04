import  {  useState } from 'react';
import dynamic from 'next/dynamic'; // Use Next.js' dynamic import if using Next.js
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill to prevent server-side rendering
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false, // Prevent server-side rendering
});

export default function RichTextEditorDemo() {
  const [content, setContent] = useState('');

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Create Your Post</h2>

      {/* Editor */}
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleContentChange}
        placeholder="Write something amazing..."
        className='bg-white'
      />

      {/* Preview */}
      <h3>Preview:</h3>
      <div
        style={{
          border: '1px solid #ddd',
          padding: '10px',
          minHeight: '200px',
          marginTop: '10px',
          backgroundColor: '#f9f9f9',
        }}
        dangerouslySetInnerHTML={{ __html: content }} // Display the formatted HTML content
      ></div>
    </div>
  );
}
