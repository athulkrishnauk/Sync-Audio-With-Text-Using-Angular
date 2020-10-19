import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit{
  
  title = 'audioTextSync';

  constructor() {}

  @ViewChild('audiofile', {static: true}) audioPlayer: ElementRef<HTMLAudioElement>;

  ngOnInit() {}

  ngAfterViewInit() {
    this.just_one();
  }

  just_one() {

    var subtitles = document.getElementById("subtitles");

    var syncData = [
      { "end": 0.2,"start": 0.0,"text": "I"},
      { "end": 0.7,"start": 0.2,"text": "believe"},
      { "end": 0.9,"start": 0.7,"text": "you're"},
      { "end": 1.2,"start": 0.9,"text": "just"},
      { "end": 1.4,"start": 1.2,"text": "talking"} ,
      { "end": 1.7,"start": 1.4,"text": "nonsense"}                   
    ];
       
    createSubtitle();

    function createSubtitle()
      {
        var element;
        for (var i = 0; i < syncData.length; i++) {
          element = document.createElement('span');
          element.setAttribute("id", "c_" + i);
          element.style.transition = "1s";
          element.innerText = syncData[i].text + " ";
          subtitles.appendChild(element);
        }
      }

    this.audioPlayer.nativeElement.addEventListener("timeupdate", function(e) {
      syncData.forEach((element, index, array) => {
        const currTime = (event.target as HTMLAudioElement).currentTime;
        if((event.target as HTMLAudioElement).currentTime >= element.start && (event.target as HTMLAudioElement).currentTime <= element.end) {
          (<HTMLElement>subtitles.children[index]).style.backgroundColor = "yellow";
        }
      });
    });
  }
}
