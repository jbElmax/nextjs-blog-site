import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps{
    value:string;
    onChange:(value:string)=>void;
}

const RichTextEditor:React.FC<RichTextEditorProps> = ({value,onChange}) =>{
    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
      
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']                                         // remove formatting button
      ];
      const handleEditorChange = (content: string) => {
        onChange(content);
      };
    return(
        <ReactQuill
        value={value}
        onChange={handleEditorChange}
        modules={{
        toolbar: toolbarOptions,
        
        }}

      />
    )
}

export default RichTextEditor;