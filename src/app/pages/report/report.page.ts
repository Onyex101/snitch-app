import { FirebaseService } from './../../services/firebase/firebase.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonContent, Events } from '@ionic/angular';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  @ViewChild('content') content: IonContent;
  @ViewChild('chat_input') messageInput: ElementRef;
  User = 'Me';
  toUser = 'driver';
  inp_text: any;
  editorMsg = '';
  image;
  showEmojiPicker = false;
  msgList: Array<{
    userId: any,
    userName: any,
    userAvatar: any,
    time: any,
    message: any,
    upertext: any;
    status?: string;
  }>;
  public count = 0;
  public arr = [
    {
      'messageId': '1',
      'userId': '140000198202211138',
      'userName': 'Luff',
      'userImgUrl': './assets/user.jpg',
      'toUserId': '210000198410281948',
      'toUserName': 'Hancock',
      'userAvatar': './assets/to-user.jpg',
      'time': 1488349800000,
      // tslint:disable-next-line: quotemark
      'message': "Report upload succesfull",
      'status': 'success'

    },
    {
      'messageId': '2',
      'userId': '210000198410281948',
      'userName': 'Hancock',
      'userImgUrl': './assets/to-user.jpg',
      'toUserId': '140000198202211138',
      'toUserName': 'Luff',
      'userAvatar': './assets/user.jpg',
      'time': 1491034800000,
      'message': 'we\'ll get back to you',
      'status': 'success'
    }
  ];
  constructor(
    private events: Events,
    private fire: FirebaseService,
  ) {
    this.msgList = [
      {
        userId: this.User,
        userName: this.User,
        userAvatar: 'assets/driver.jpeg',
        time: '12:01 pm',
        message: 'Sample Report',
        upertext: 'Hello'
      },
      {
        userId: this.toUser,
        userName: this.toUser,
        userAvatar: 'assets/user.jpeg',
        time: '12:01 pm',
        message: 'Sample reply from server',
        upertext: 'Hii'
      }
    ];
  }

  ngOnInit() {
  }

  scrollToBottom() {
    this.content.scrollToBottom(100);
  }

  ionViewWillLeave() {
    this.events.unsubscribe('chat:received');
  }

  ionViewDidEnter() {
    console.log('scrollBottom');
    setTimeout(() => {
      this.scrollToBottom();
    }, 500);
    console.log('scrollBottom2');
  }

  logScrollStart() {
    console.log('logScrollStart');
    document.getElementById('chat-parent');
  }

  logScrolling(event) {
    console.log('event', event);
  }

  sendMsg() {
    console.log(this.inp_text);
      let otherUser;
      if (this.count === 0) {
        otherUser = this.arr[0].message;
        this.count++;
      } else if (this.count === this.arr.length) {
        this.count = 0;
        otherUser = this.arr[this.count].message;
      } else {
        otherUser = this.arr[this.count].message;
        this.count++;
      }

      this.msgList.push({
        userId: this.User,
        userName: this.User,
        userAvatar: 'assets/user.jpeg',
        time: '12:01 pm',
        message: this.inp_text,
        upertext: this.inp_text
      });
      const report = {
        description: this.inp_text,
        date: Date.now()
      };
      console.log(report);
      this.fire.createReport(report).then((rep) => {
        console.log(rep);
        this.msgList.push({
          userId: this.toUser,
          userName: this.toUser,
          userAvatar: 'assets/user.jpeg',
          time: '12:01 pm',
          message: otherUser,
          upertext: otherUser
        });
      }).catch(e => console.log(e));
      this.inp_text = '';
      setTimeout(() => {
        this.scrollToBottom();
      }, 10);
  }

}
