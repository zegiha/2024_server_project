import {
  ArrowBack,
  Arrow_right_alt,
  Arrow_ios,
  Notifications,
  UnreadNotifications,
  Edit_variable, Edit_24_gray, Add,
} from '../../assets/icons';

type registeredIcon =
  'arrow_back' |
  'arrow_right_alt'|
  'arrow_ios' |
  'notifications' |
  'notifications_unread' |
  'edit' |
  'edit_24_gray' |
  'add';
interface IIcon {
  icon: registeredIcon,
}

export default function Icon({
  icon,
}: IIcon) {
  switch (icon) {
    case 'arrow_back':
      return <ArrowBack/>;
    case 'arrow_right_alt':
      return <Arrow_right_alt/>;
    case 'arrow_ios':
      return <Arrow_ios/>;
    case 'notifications':
      return <Notifications/>;
    case 'notifications_unread':
      return <UnreadNotifications/>;
    case 'edit':
      return <Edit_variable/>;
    case 'edit_24_gray':
      return <Edit_24_gray/>;
    case 'add':
      return <Add/>;
  }
}
