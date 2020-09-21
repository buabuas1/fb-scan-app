import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ElectronService} from "../core/services";
import * as queryString from 'query-string'; // import the queryString class

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private electronService: ElectronService,) {
  }

  ngOnInit(): void {
  }

  onClick() {
    // this.electronService.callApi();

  }

  public callApi() {
    const body = {
      'av': '100046024845887',
      '__user': '100046024845887',
      '__a': '1',
      '__dyn': '7AzHJ16U9k9wxxt0BwRyaG5UjBWo2nDwAxu13wIwk8KEK3q2ibwyzEeU5W2Saxa1Az8bo6u3y4o27wyw6QCxS320LE36xOfwwwto88hwKx-8wgolzUOm0Z84a3aUS2G2CaCzU7W8wnolwBgK7qxS18wc61axe2C9yoox22K263ifK6E7e58jwGzEaEfUjxS6FocobElxm3y2K2DUrw-wAw',
      '__csr': 'jAJ94jWqmZeFlV4ZBG4WZ9fV6UCiquVkju8miQnEFu_aCzRXz9AahFAoBrgCXRhV3dbEizLruHxF8uFNjoiCAGnn-iqB8vB8m4e-t7F6y49ghp9AbyRqKa-64apiyERGyupeGSFF8PUpjZk8yGUboOF6dAFpohiabogiBCCmQih5iFd26EByWBAy4pyAaDix29DCiDK9Ajgkg9uKiAmeuUKuXUtw-gUgkNUKbl5yPy8CikzXghuQEOd43p43i17VK6FoJ6pUOm-dApV8E40Cv6cCUR3AHpP1-8ai9yKNz4zVpd6CCm99SbKvVp66v5oFamqWAxy8GGy8G8jg9HqglAho8ax6dzaAmAdjg89Ehz0zGywCAzAl4olDmdAKUoU5ydocaAgQgbiaJ1bxebyE9h8R-uu8BonAzZ1V0gGwkopzU9EWlxm6ohwAUtwjA5E4esUgwMUO4E2lxFxK0AE560axwJwilG5o9oiG2KDKE2AxN1W7871pJ0Nz2AgfokGEAwzwQauUnz8422WEChw16i0yEqU3zw70wlhqa2KaohorGZ2K14w0OIyEjoc80qcw',
      '__req': 'bg',
      '__beoa': '1',
      '__pc': 'EXP2:comet_pkg',
      'dpr': '1',
      '__ccg': 'GOOD',
      '__rev': '1002603640',
      '__s': 'iolkzp:oduo69:7pnhr9',
      '__hsi': '6867672025084082239-0',
      '__comet_req': '1',
      'fb_dtsg': 'AQGKoxdL9Fax:AQGUyPzwmkZB',
      'jazoest': '22101',
      '__spin_r': '1002603640',
      '__spin_b': 'trunk',
      '__spin_t': '1599004498',
      'fb_api_caller_class': 'RelayModern',
      'fb_api_req_friendly_name': 'CometGroupDiscussionRootSuccessQuery',
      'variables': '{"UFI2CommentsProvider_commentsKey":"CometGroupDiscussionRootSuccessQuery","creative_provider_id":null,"feedLocation":"GROUP","feedType":"BUY_AND_SELL","feedbackSource":0,"focusCommentID":null,"groupID":"126771741342941","hasHoistStories":false,"hoistStories":[],"hoistStoriesCount":0,"isComet":true,"privacySelectorRenderLocation":"COMET_STREAM","regular_stories_count":3,"regular_stories_stream_initial_count":2,"renderLocation":"group","scale":1,"shouldDeferMainFeed":false,"sortingSetting":null,"useDefaultActor":false}',
      'server_timestamps': 'true',
      'doc_id': '3234595526626493',
    };
    this.electronService.callApi(queryString.stringify(body));
  }
}
