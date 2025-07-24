import { Routes, Route } from 'react-router-dom';
import { Header } from './components/header/header';
import styled from 'styled-components';
import { Footer, Modal, Error } from './components';
import  {Authorization, Main, Registration, Users, Post} from './pages/index';
import { useLayoutEffect } from 'react';
import { setUser } from './actions';
import { useDispatch } from 'react-redux';
import {ERROR} from './bff/constants/error';

const AppColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: spase-between;
  position: relative;
  align-items: center;
  width: 1000px;
  min-height: 100%;
  margin: 0 auto;
  background: #f5f5f5;
  `;

const Page = styled.div`
 padding: 120px 0 20px;

`;

export const Blog = () => {
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        const currentUserDataJSON = sessionStorage.getItem('userData');
        if (!currentUserDataJSON) {
            return;
        }
        const currentUserData = JSON.parse(currentUserDataJSON);
        // Assuming you want to load some initial data when the component mounts
        dispatch(
            setUser({
                ...currentUserData,
                roleId: Number(currentUserData.roleId),
            }),
        );
    }, [dispatch]);

  return (
      <AppColumn>
          <Header />
          <Page>
              <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/login" element={<Authorization />} />
                  <Route path="/register" element={<Registration />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/post" element={<Post />} />
                  <Route path="/post/:id" element={<Post />} />
                  <Route path="/post/:id/edit" element={<Post />} />
                  <Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST}/>} />
              </Routes>
          </Page>
          <Footer />
          <Modal />
      </AppColumn>
  );
};