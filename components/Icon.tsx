import {
  ArrowBack,
  Arrow_right_alt,
  Arrow_ios,
  Notifications,
  UnreadNotifications,
  Edit_variable
} from '../assets/icons';

type registeredIcon = 'arrow_back' | 'arrow_right_alt' | 'arrow_ios' | 'notifications' | 'notifications_unread' | 'edit';
interface IIcon {
  icon: registeredIcon,
  width?: number,
  color?: 'dim' | 'variable',
}

export default function Icon({
  icon,
  color = 'variable',
  width = 24,
}: IIcon) {
  switch (icon) {
    case 'arrow_back':
      return <ArrowBack width={width}/>;
    case 'arrow_right_alt':
      return <Arrow_right_alt width={width}/>;
    case 'arrow_ios':
      return <Arrow_ios width={width}/>;
    case 'notifications':
      return <Notifications width={width}/>;
    case 'notifications_unread':
      return <UnreadNotifications width={width}/>;
    case 'edit':
      if(color === 'variable')
        return <Edit_variable width={width}/>;
      else
        return <Edit_variable width={width}/>;
  }
}
