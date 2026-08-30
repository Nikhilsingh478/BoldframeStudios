import StaggeredMenu from './react-bits/StaggeredMenu';

export function Header({ onContactClick }: { onContactClick: () => void }) {
  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '#hero' },
    { label: 'Services', ariaLabel: 'View our services', link: '#capabilities' },
    { label: 'Work', ariaLabel: 'View selected work', link: '#work-gallery' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' }
  ];

  const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'GitHub', link: 'https://github.com/Nikhilsingh478' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/nikhilsingh14788' }
  ];

  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor="#E6EEF3"
      openMenuButtonColor="#111111"
      changeMenuColorOnOpen={true}
      colors={['#B497CF', '#5227FF']}
      accentColor="#5227FF"
      isFixed={true}
      onContactClick={onContactClick}
    />
  );
}
