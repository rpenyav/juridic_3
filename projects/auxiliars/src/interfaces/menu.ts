export interface MenuItem {
  icon: string;
  key?: string;
  text: string;
  url?: string;
  children?: MenuItem[];
  isOpen?: boolean;

}
