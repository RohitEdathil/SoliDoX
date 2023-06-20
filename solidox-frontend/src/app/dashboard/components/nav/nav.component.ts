import { Component } from '@angular/core';
import { Org } from 'src/app/org/org.model';
import { OrgService } from 'src/app/org/org.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  org: Org = new Org('', ' ', '', 0, 0);

  constructor(
    private orgService: OrgService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.org = await this.orgService.get(this.userService.accountId);
  }
}
