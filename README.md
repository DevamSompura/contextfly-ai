# ContextFly AI

ContextFly is a simple, lightweight tool I built to make browsing and learning easier. 

We’ve all been there: you’re reading an article, you hit a complex paragraph or a confusing error code, and you have to copy it, open a new tab, and paste it into an AI chat to understand it. ContextFly fixes that. It’s a Chrome extension that lets you highlight text and get an instant AI explanation right in your browser.

## What's in this version (v1.0)
This is the first stable version of the project. It’s built to be simple and reliable:
* **The Extension:** A small tool that sits in your Chrome toolbar and captures the text you highlight.
* **The Backend:** A fast Python server (FastAPI) that takes that text, talks to an AI, and sends the answer back to you.

## How to run it on your computer
I wanted to make this easy for anyone to try out. If you have Python installed, you can get it running in a few minutes:

### 1. Get the code
Download the project to your computer:

git clone [https://github.com/DevamSompura/contextfly-ai.git](https://github.com/DevamSompura/contextfly-ai.git)
cd contextfly-ai


### 2. Start the backend server
1. Go into the backend folder: cd contextfly-backend
2. Set up a quick virtual environment: python -m venv venv
3. Turn it on:
        ->Windows: venv\Scripts\activate
        ->Mac/Linux: source venv/bin/activate
4. Install the parts it needs: pip install fastapi uvicorn pydantic requests python-dotenv
5. Make sure you have your AI API key in a .env file, then run: uvicorn main:app --reload


### 3. Add the extension to Chrome
    1.Open Chrome and go to chrome://extensions/.

    2.Toggle "Developer mode" in the top right.

    3.Click "Load unpacked" and pick the contextfly-extension folder.

    4.You're all set! Just highlight some text and click the icon in your toolbar to see it work.

## 🎯 How to Use It
    1. **Highlight:** Simply highlight any text on a webpage that you want to understand.

    2. **Trigger:** You have two easy ways to trigger the tool:
    - **Keyboard Shortcut:** Press `Ctrl + Shift + Y` to instantly capture the text.
    - **Toolbar Icon:** Click the **ContextFly icon** in your Chrome toolbar.
    
    3. **Analyze:** Once triggered, the extension sends your text to the AI, and the explanation will appear right in the extension popup window.

This project is open-source, so feel free to look around the code, try it out, or let me know what you think. I'm building this to learn and to make the web a bit easier to navigate!
