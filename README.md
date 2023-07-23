# gpu2サーバの使用率を可視化する


### 研究室のサーバに対して`nvidia-smi`コマンドを送って、サーバがどれだけ使われているかを可視化する


## 技術
- frontend : react, js
  - axios
- backend : flask, python3
  - CORS
- docker

## レポジトリ

- [github](https://github.com/shintaro0930/server-util-visualization.git)



## 実行
```sh
# build the image
docker build --force-rm=true -t server-util .

# start the container
docker run -it --name server_taro --hostname server-taro -p 3000:3000 -p 3001:3001 -v $(pwd):/work server-util

```

**フロント側とバック側でコンテナを2つ立ち上げた方がやりやすい**
```sh
docker exec -it container /bin/bash
```
**を2回する**

## frontend
```sh
# install npm package

sudo apt install -y npm
	# TZ : Asia/Tokyo
```
nのinstall
```sh
sudo npm install -g n
```

`npm -v`で`v10.X`とか言われたら、そのnpmは古すぎて使えない
npmのstable versionをinstall
`n --stable`で`v18.17.0`みたいなのが出るので
```sh
sudo n 18.17.0
```
でstableをinstall

```sh
sudo n
```
でversion変更(↑↓キーとenter)
```sh
npm -v
```
で最終確認

```sh
npm start
```
でok
サーバの`ローカルネットワークのIP:3000`で開く

バックグラウンドで動かすためには
```sh
nohup npm start &
```
これで`exit`してもコンテナは動き続ける

## backend

```psh
python3 main.py
```
足りないのは追加してください

バックグラウンドで動かすためには
```sh
nohup python3 main.py &
```
これで`exit`してもコンテナは動き続ける




>参考文献

- [nに関して](https://parashuto.com/rriver/tools/updating-node-js-and-npm)


