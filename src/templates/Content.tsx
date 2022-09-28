import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Login from '../pages/Login';
import MyPage from '../pages/MyPage';

interface ContentProps {
    user: any | null;
}

const Content = ({ user }: ContentProps) => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={user && user.uid ? <MyPage /> : <Login />}>
                </Route>
                <Route path="mypage" element={<MyPage />}>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Content;
