import React from 'react';
import Container from '../Container';
import './style.css';
import { IGift } from '../../../model';
import Text from '../Text';
import Image from '../Image';
import Button from '../Button';
import Icon from '../Icon';
import { history } from '../../App';

interface ICardProps {
  gift: IGift;
}

const Card: React.FC<ICardProps> = (props) => {
  const { gift } = props;
  const outOfStock = gift.stock === 0
  const cardHoverClassName = `card-hover ${outOfStock ? 'background-gray' : 'background-green'}`

  const goToDetail = () => {
    const slug = gift.name.toLowerCase().split(' ').join('-');
    history.push(`/detail/${slug}`);
  }

  const hoverContent = (
    <Container className={cardHoverClassName}>
      <Container className='card-hover-content'>
        <Button fitContent type='secondary-2' size='small'>
          <Icon name='love-outline' size='20px' color='white' />
        </Button>
        <Text.Paragraph size='16' weight='medium' color={outOfStock ? 'black' : 'white'}>{gift.name}</Text.Paragraph>
        <Button onCLick={goToDetail} fullX type={outOfStock ? 'secondary-4' : 'secondary-2'} size='small'>
          <Text.Paragraph size='12' color='white'>View Detail</Text.Paragraph>
        </Button>
      </Container>
    </Container>
  )

  return (
    <Container className='app-card'>
      {
        !outOfStock && gift.isNew === 1 && (
          <Container className='is-new-label'>
            <Text.Paragraph size='14' weight='bold'>New</Text.Paragraph>
          </Container>
        )
      }
      {hoverContent}
      <Container>
        <Button fitContent type='secondary-3' size='small'>
          <Icon name='love-outline' size='20px' color='gray' />
        </Button>
        {outOfStock && (<Text.Span className='out-of-stock' size='12' weight='semibold' color='red'>Out of stock</Text.Span>)}
      </Container>
      <Container className='card-image'>
        <span>
          <Image src={gift.image || ''} height='265px' />
        </span>
      </Container>
      <Container>
        <Text.Paragraph size='16' weight='medium'>{gift.name}</Text.Paragraph>
        <Text.Paragraph size='14' weight='regular' color='green'>{gift.points} points</Text.Paragraph>
        {gift.rating} - <Text.Span size='12' color='gray'>{`${gift.num_reviews} reviews`}</Text.Span>
      </Container>
    </Container>
  );
}

export default Card;
