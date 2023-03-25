import {Component} from '@angular/core';
import {faHome, faFile, faBook, faMessage, faChartPie, faEarthAmericas} from '@fortawesome/free-solid-svg-icons'
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    homeIcon = faHome;
    educationIcon = faBook;
    filesIcon = faFile;
    chatIcon = faMessage;
    sessionRecapIcon = faChartPie;
    worldBookIcon = faEarthAmericas;

    menuItems: Array<{path: string, icon: IconDefinition, title: string}> = [
        {
            path: '/',
            icon: this.homeIcon,
            title: 'Home'
        },
        {
            path: '/education',
            icon: this.educationIcon,
            title: 'Education'
        },
        {
            path: '/files',
            icon: this.filesIcon,
            title: 'Files'
        },
        {
            path: '/chat',
            icon: this.chatIcon,
            title: 'Chat'
        },
        {
            path: '/session-recaps',
            icon: this.sessionRecapIcon,
            title: 'Session Recaps'
        },
    ];
}
