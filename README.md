# Quant Alpha Monitor | 量化策略實驗室

一個專為量化金融研究員設計的即時儀表板，自動追蹤 arXiv 上最新的 Quantitative Finance (q-fin) 論文，幫助研究者快速獲取市場微結構、動能策略與計量經濟學的最新學術進展。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-18.2.0-61DAFB.svg?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/typescript-5.0-3178C6.svg?style=flat&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-3.3-38B2AC.svg?style=flat&logo=tailwind-css)

## 🚀 功能特色

*   **自動化資料擷取**：即時串接 arXiv API，篩選 `cat:q-fin.*` 類別的最新論文。
*   **專業級介面**：採用深色模式 (Dark Mode) 設計，符合量化交易員的視覺習慣。
*   **互動式閱讀**：
    *   **摺疊式卡片**：快速瀏覽標題與作者，點擊展開閱讀摘要。
    *   **一鍵導向**：直接連結至 arXiv 原文 PDF 頁面。
*   **作者簡介側邊欄**：整合個人品牌展示（Aaron Tseng）、研究領域標籤與聯絡方式。
*   **響應式設計**：支援桌面與行動裝置瀏覽。

## 🛠️ 技術棧

*   **前端框架**: React 18
*   **語言**: TypeScript
*   **樣式**: Tailwind CSS
*   **圖標庫**: Lucide React
*   **資料來源**: arXiv API (via CORS Proxy)

## 📦 安裝與執行

### 前置需求
*   Node.js (v16 或更高版本)
*   npm 或 yarn

### 步驟

1.  **Clone 專案**
    ```bash
    git clone https://github.com/your-username/quant-alpha-monitor.git
    cd quant-alpha-monitor
    ```

2.  **安裝依賴**
    ```bash
    npm install
    ```

3.  **啟動開發伺服器**
    ```bash
    npm start
    ```
    瀏覽器將自動開啟 `http://localhost:3000`。

## 📂 專案結構

```
quant-alpha-monitor/
├── public/              # 靜態資源
├── src/
│   ├── components/      # React 組件 (Sidebar, PaperCard)
│   ├── services/        # API 服務 (arXiv xml parser)
│   ├── types.ts         # TypeScript 類型定義
│   ├── App.tsx          # 主程式邏輯
│   └── index.tsx        # 進入點
├── package.json
└── README.md
```

## 📝 授權

本專案採用 [MIT License](LICENSE)。

## 👤 作者

**Aaron Tseng**
*   Senior Quant Researcher
*   專注領域：計量經濟學、動能策略 (Momentum)、市場微結構

---
Developed with ❤️ for the Quant Community.
