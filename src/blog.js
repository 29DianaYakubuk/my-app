import { Routes, Route } from 'react-router-dom';
import { Header } from './components/header/header';
import styled from 'styled-components';
import { Footer } from './components/footer/footer';
import  {Authorization, Registration, Users}  from './pages';

const AppColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1000px;
  height: 100%;
  margin: 0 auto;
    background: #f5f5f5;
  `;

const Page = styled.div`
 padding: 120px 0;

`;

export const Blog = () => {
  return (
      <AppColumn>
          <Header />
          <Page>
              <Routes>
                  <Route path="/" element={<div>Main page</div>} />
                  <Route path="/login" element={<Authorization/>} />
                  <Route path="/register" element={<Registration/>} />
                  <Route path="/users" element={<Users/>} />
                  <Route path="/post/:post_id" element={<div>Post</div>} />
                  <Route path="/post" element={<div>New post</div>} />
                  <Route path="*/" element={<div>Error</div>} />
              </Routes>
          </Page>
          <Footer />
      </AppColumn>
  );
}
