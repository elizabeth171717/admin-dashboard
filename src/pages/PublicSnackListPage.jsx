
import SnackListForm from "../components/SnackListForm";


export default function PublicSnackListPage({ snackList }) {
  return (
    <SnackListForm
    snackList={snackList}
    editMode={false} />
  );
}