import DashboardIcon from '@material-ui/icons/Dashboard';
import BusinessIcon from '@material-ui/icons/Business';
import SettingsIcon from '@material-ui/icons/Settings';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PagesIcon from '@material-ui/icons/Pages';

const menuItems = [
    {
        name: 'frontdesk',
        label: 'Frontdesk',
        icon: DashboardIcon,
        url: '/',
        topMenuItems: [
            {
                name: 'home',
                label: 'Dashboard',
                url: '/'
            }
        ]
    },
    {
        name: 'backoffice',
        icon: BusinessIcon,
        label: 'Backoffice',
        url: '/',
        topMenuItems: [
            {
                name: 'home',
                label: 'Dashboard',
                url: '/'
            }
        ]
    },

    {
        name: 'settings',
        icon: SettingsIcon,
        label: 'Settings',
        url: '/',
        topMenuItems: [
            {
                name: 'home',
                label: 'Dashboard',
                url: '/'
            }
        ]
    },
    {
        type: 'divider',
        name: 'divider1'
    },
    {
        name: 'accounts',
        icon: SupervisorAccountIcon,
        label: 'Accounts',
        url: '/',
        topMenuItems: [
            {
                name: 'home',
                label: 'Dashboard',
                url: '/'
            }
        ]
    },
    {
        name: 'learn_center',
        icon: PagesIcon,
        label: 'Learn Center',
        url: '/',
        topMenuItems: [
            {
                name: 'home',
                label: 'Dashboard',
                url: '/'
            }
        ]
    }
];

export default menuItems;
