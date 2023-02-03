import { Fragment } from 'react';
import { GoTrashcan } from 'react-icons/go';
import Button from './Button';
import useThunk from '../hooks/useThunk';
import { deleteUser } from '../store';
import ExpandablePanel from './ExpandablePanel';
import AlbumsList from './AlbumsList';

function UsersListItem({ user }) {
  const [doDoletingUser, isDeletingUser, deletingUserError] =
    useThunk(deleteUser);

  const handleUserDelete = () => {
    doDoletingUser(user);
  };

  const header = (
    <Fragment>
      <Button
        className="mr-3"
        loading={isDeletingUser}
        onClick={handleUserDelete}
      >
        <GoTrashcan />
      </Button>
      {deletingUserError && <div>Error deleting user.</div>}
      {user.name}
    </Fragment>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
}

export default UsersListItem;
