import { Input } from '@tanchohang/langtang-rcl';
import FileUpload from './file-upload';

interface Props {}
const UploadForm = (props: Props) => {
  return (
    <form>
      Project
      <select name="project" id="" required>
        <optgroup>
          <option value="1" />
        </optgroup>
      </select>
      <Input placeholder="path" />
      <FileUpload handleChange={() => {}} />
    </form>
  );
};
export default UploadForm;
