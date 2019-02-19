from flask import Flask, jsonify, send_from_directory
from bs4 import BeautifulSoup as bs
import requests
import youtube_dl
from flask import render_template
import pafy
import vlc
import time 

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('/index.html')

#scrape multiple videos from youtubes API
@app.route('/search/<id>', methods=['GET', 'POST'])
def slavUnion(id):
    base = "https://www.youtube.com/results?search_query="
    qstring = id.replace(' ', '+')
    r = requests.get(base+qstring)
    #print (qstring)

    r = requests.get(base+qstring)

    page = r.text
    soup=bs(page,'html.parser')

    vids = soup.findAll('a',attrs={'class':'yt-uix-tile-link'})
    videolist=[]
    for v in vids:
        tmp = 'https://www.youtube.com' + v['href']
        videolist.append(tmp)

    for i in videolist:
        if ("radio" in i ) or ("channel" in i):
            videolist.remove(i)

    print (videolist)
    return jsonify(videolist), 200

#If you want to download video audio on you device
"""
    for b in videolist:
        video = pafy.new(b)
        best = video.getbest()
        playurl = best.url

        Instance = vlc.Instance()
        player = Instance.media_player_new()
        Media = Instance.media_new(playurl)
        Media.get_mrl()
        player.set_media(Media)
        player.play()
        time.sleep(Media.length)
    #if you want to download the mp3 
    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
    }
    
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        increment = 0
        for a in videolist:
            if(increment == 0):
                ydl.download([str(a)])
            if(['status'] == 'finished'):
                ydl.download([str(a)])
                increment += 1"""
    
            
app.run(debug=True)
