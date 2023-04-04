import { Button, Input, Label, RadioCheck } from '@tanchohang/langtang-rcl';
import { useForm } from 'react-hook-form';
import FileUpload from './file-upload';
import useSWR from 'swr';
import { getAllProject } from 'lib/services/project.service';

interface Props {
  submitHandler: (formdata: FormData) => void;
}
const UploadForm = ({ submitHandler }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { data: projects, error, isLoading } = useSWR('/projects', getAllProject);

  const onSubmit = (data: any) => {
    console.log(data);
    const formData = new FormData();
    formData.append('project', data.project);
    formData.append('subFolders', data.path);
    formData.append('public', data.public);
    Array.from(data.files as FileList).map((file: File) => formData.append('files', file));
    submitHandler(formData);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 bg-white m-auto p-20 w-[50%] mt-[10%]">
      <h3 className="text-2xl font-semibold">Upload Form:</h3>
      <select {...register('project', { required: true })} id="project-select">
        <option value="">--Please choose a Project--</option>
        {projects?.data.map((p: any) => (
          <option value={p._id} key={p._id}>
            {p.name}
          </option>
        ))}
      </select>
      <Input placeholder="path" {...register('path')} />
      <Input type="file" required multiple {...register('files')} />
      <Label className="flex  gap-3">
        <input type="checkbox" {...register('public')} />
        <span>Public</span>
      </Label>
      <Button size="lg" variant="default">
        Submit
      </Button>
    </form>
  );
};
export default UploadForm;
