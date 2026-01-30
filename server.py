import os
import subprocess
import sys
from fastapi import FastAPI
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Get the current directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Mount static files (css, js, assets)
app.mount("/css", StaticFiles(directory=os.path.join(BASE_DIR, "css")), name="css")
app.mount("/js", StaticFiles(directory=os.path.join(BASE_DIR, "js")), name="js")
app.mount("/assets", StaticFiles(directory=os.path.join(BASE_DIR, "assets")), name="assets")

@app.get("/")
async def read_index():
    return FileResponse(os.path.join(BASE_DIR, "index.html"))

@app.get("/secret")
async def read_secret():
    return FileResponse(os.path.join(BASE_DIR, "secret.html"))

@app.get("/api/run-turtle")
async def run_turtle():
    """
    Runs the turtle script in a separate subprocess.
    This endpoint waits until the subprocess (turtle window) is closed.
    """
    script_path = os.path.join(BASE_DIR, "turtle_heart.py")
    
    # Run the script using the same python executable
    try:
        # subprocess.run blocks this thread until the process completes
        # In a real production server, we'd use asyncio.create_subprocess_exec
        # But for a local single-user app, this is fine and simpler.
        result = subprocess.run([sys.executable, script_path], check=True)
        return {"status": "success", "message": "Animation finished"}
    except subprocess.CalledProcessError as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
