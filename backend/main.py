import subprocess

from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def convert_bytes_to_gb(bytes_value):
    gb_value = (bytes_value / (1024 ** 2)) * 1000
    return gb_value

def get_gpu_memory_usage():
    try:
        output = subprocess.check_output(['nvidia-smi', '--query-gpu=memory.used', '--format=csv,nounits,noheader'])
        memory_used_bytes = [int(x) for x in output.decode('utf-8').strip().split('\n')]
        memory_used_gb = [convert_bytes_to_gb(memory) for memory in memory_used_bytes]
        return memory_used_gb
    except subprocess.CalledProcessError as e:
        print("GPUメモリ使用率の取得中にエラーが発生しました。")
        return None

@app.route("/gpu-memory-usage")
def gpu_memory_usage_endpoint():
    gpu_memory_usage_gb = get_gpu_memory_usage()
    if gpu_memory_usage_gb is not None:
        memory_info = [{"GPU": idx, "Memory Used (GB)": memory_gb} for idx, memory_gb in enumerate(gpu_memory_usage_gb)]
        return jsonify(memory_info)
    else:
        return jsonify({"error": "GPUメモリ使用率の取得に失敗しました。"}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3001, debug=True)
