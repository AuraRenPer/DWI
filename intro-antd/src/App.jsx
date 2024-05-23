import { DatePicker, ConfigProvider, Button } from 'antd';
import LayoutComponent from './components/layout';

import './App.css'

function App() {

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FF5733"
        }
      }}
    >
      <LayoutComponent />
    </ConfigProvider>
  )
}

export default App
