import React, { useState } from 'react'
import { useUsersQuery, UserFindBy, useCreateUserMutation, AuthType } from './../../../generated/graphql';
import Card from '@atoms/Card/Card';
import Loading from '@atoms/Loading/Loading';
import Table from '@molecules/Table/Table';
import './UserEdit.css';
import UserModal from './UserModal';
import { useLoginStore } from './../../../store/loginStore'

// formik, yup
// https://qiita.com/SLEAZOIDS/items/e33f81bfa163592578d9
// https://bvgsoftware.com/blog/react-form-validation-with-formik-graphql-yup/

interface UserEditProps { }

interface IUserTableRow {
  id: string;
  name: string;
  email: string;
}

const UserEdit: React.FC<UserEditProps> = ({ }) => {
  const {
    loginInfo,
    setLoginState,
  } = useLoginStore();

  const [createUserQuery, { loading: ucLoading, data: ucRes }] = useCreateUserMutation();
  const { loading, data, refetch } = useUsersQuery({
    variables: {
      skip: 0,
      // take: 20,
      searchString: "",
      findBy: [UserFindBy.Name]
    }
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  // table data
  const userKeys = ['name', 'email', 'updatedAt'];
  const userData = data?.users ? data.users.map((user) => {
    return {
      name: user.name,
      email: user.email,
      updatedAt: user.updatedAt,
    }
  }) : [];

  const handlePageChange = (pagenum: number) => {
    setCurrentPage(pagenum);
  }

  const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const closeModal = () => {
    setIsShowModal(false);
  }
  const openModal = () => {
    setIsShowModal(true);
  }

  const createUser = async () => {
    const res = await createUserQuery({ variables: { name, email, authType: AuthType.User } })
    if (res.data) {
      setName('')
      setEmail('')
      refetch()
    }
  }

  // TODO: Simplify
  type InputInterface = HTMLInputElement | HTMLSelectElement;
  type EV<T extends InputInterface> = React.ChangeEvent<T>;
  const unwrapEv = (event: EV<InputInterface>) => {
    return event?.target?.value ?? '';
  }

  const onInput = (e: EV<HTMLInputElement>) => {
    setLoginState({ ...loginInfo, loginName: unwrapEv(e) })
  }

  return (<>
    <Loading isLoading={loading || ucLoading} />
    {isShowModal && <UserModal
      name={name}
      email={email}
      handleInputName={handleInputName}
      handleInputEmail={handleInputEmail}
      handleClickClose={closeModal}
      handleClickCreate={createUser}
    />}
    <Card classes="d-flex column">
      <label htmlFor="">Name</label>
      <input type="text" value={loginInfo.loginName} onChange={onInput} />
      <div>{loginInfo.loginId}</div>
      <div>{loginInfo.loginName}</div>
      <div className="d-flex">
        <div className="spacer"></div>
        <button className="btn btn-primary" onClick={openModal}>AddNewUser</button>
      </div>
      <Table
        <IUserTableRow>
        head={userKeys}
        body={userData}
        onPageChange={handlePageChange}
        currentIndex={currentPage}
        countPerPage={10}
      />
    </Card>
  </>
  );
}
export default UserEdit;