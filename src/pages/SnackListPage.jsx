
import SnackListForm from "../components/SnackListForm";

export default function SnackListPage({ snackList }) {
  return (
    <SnackListForm 
     snackList={snackList}
    editMode={true} />
  );
}