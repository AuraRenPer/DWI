import { DatePicker, ConfigProvider, Button } from 'antd';
import LayoutComponent from './components/layout';
import FormLogin from './components/FormLogin';

import './App.css'
import ImageLogin from './components/ImageLogin';

function App() {

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FF5733"
        }
      }}
    >
      <LayoutComponent
        leftColSize={{ xs: 0, sm: 0, md: 8, lg: 6 }}
        rightColSize={{ xs: 24, sm: 24, md: 16, lg: 18 }}
        LeftContent={<ImageLogin />}
        rightContent={<FormLogin />}
      />
    </ConfigProvider>
  )
}

export default App
