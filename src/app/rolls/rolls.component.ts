import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {ElasticsearchService} from '../shared/services/elasticsearch.service';
import {Character, SecondaryStat} from '../shared/models/character';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {ChatService} from '../shared/services/chat.service';
import {IChat} from '../shared/models/ichat';

@Component({
  selector: 'app-rolls',
  templateUrl: './rolls.component.html',
  styleUrls: ['./rolls.component.scss']
})
export class RollsComponent implements OnInit {

  uid: string;
  userChar: Character;
  userLoaded: boolean;
  generalStats; athleticSkills; vigorSkills; perceptionSkills; intellectualSkills; socialSkills; subterfugeSkills; creativeSkills; specialSkills;

  chats: IChat[] = [];
  message: string;
  sending: boolean;
  chatJoined: boolean;


  constructor( private as: AuthService, private es: ElasticsearchService, private router: Router, private snackbar: MatSnackBar, private chatService: ChatService) { }

  ngOnInit() {
    this.userLoaded = false;
    this.chatJoined = false;
    this.connectToChat();
    this.as.getUser().subscribe((user) => {
      this.uid = user.uid;
      this.fetchUserChara(this.uid);
      this.userLoaded = true;
    });
  }
  fetchUserChara(id) {
    this.es.getDocument('characters', '_doc', id)
      .then(response => {
          this.userChar = response._source;
          console.log(this.userChar);
          this.loadStats();
        }, error => {
        this.snackbar.open('Create a character before trying to roll the dices', 'Lol ok');
          this.router.navigate(['/presentation']);
        }
      );
  }

  loadStats() {
    this.generalStats = this.userChar.base_stats;
    this.athleticSkills = this.userChar.secondary_stats.filter(x => x.category === 'athletic');
    this.vigorSkills = this.userChar.secondary_stats.filter(x => x.category === 'vigor');
    this.perceptionSkills = this.userChar.secondary_stats.filter(x => x.category === 'perception');
    this.intellectualSkills = this.userChar.secondary_stats.filter(x => x.category === 'intellectual');
    this.socialSkills = this.userChar.secondary_stats.filter(x => x.category === 'social');
    this.subterfugeSkills = this.userChar.secondary_stats.filter(x => x.category === 'subterfuge');
    this.creativeSkills = this.userChar.secondary_stats.filter(x => x.category === 'creative');
    this.specialSkills = this.userChar.secondary_stats.filter(x => x.category === 'special');
  }

  rollGeneral(statValue: number) {
    let roll = Math.floor(Math.random() * 10 + 1);
    alert('Total : ' + (roll + statValue) + ', rolled a ' + roll);
  }

  rollSkill(statValue: number) {
    let result = [];
    let dice = Math.floor(Math.random() * 100 + 1);
    if (dice === 1 || dice === 2 || (dice === 3 && statValue < 200) ) {
      alert('Epic fail');
    } else if (dice === 100) {
      alert('Automatic success');
    }

    while (/*this.userChar.disadvantages.indexOf('banefulDestiny') === -1 && */dice >= 90) {
      result.push(dice);
      dice = Math.floor(Math.random() * 100 + 1);
    }

    result.push(dice);
    let total = statValue;
    result.forEach(x => total = total + x);

    alert('Total result : ' + total + ', rolled : ' + result);

  }

  computeSkillTotal (element: SecondaryStat) {
    return element.class + element.special + this.getStatMod(element.baseStatMod) * element.modMultiplier + element.base;
  }

  getStatMod(id: string) {
    return this.userChar.base_stats.find(x => x.id === id).mod;
  }

  connectToChat() {
    console.log('lol ok');
    this.chatService.getChannel().bind('chat', data => {
      if (data.email === this.chatService.user.email) {
        data.isMe = true;
      }
      this.chats.push(data);
    });
  }

  sendMessage(message: string) {
    this.sending = true;
    this.chatService.sendMessage(message)
     .subscribe(resp => {
        this.message = undefined;
        this.sending = false;
     }, err => {
        this.sending = false;
    });
  }
}
