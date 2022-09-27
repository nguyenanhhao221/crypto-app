import { Button } from 'antd';
import { TBrands } from '../type';

type Props = {
  brand: TBrands;
};
const BrandBackLink = ({ brand: { logo, name, url } }: Props) => {
  return (
    <Button
      type="link"
      title={`Powered by ${name}`}
      href={url}
      target="_blank"
      rel="noreferrer noopener"
    >
      <span>Powered by</span>
      <img className="refer-logo-brand" alt={`${name} Logo`} src={logo} />
    </Button>
  );
};
export default BrandBackLink;
