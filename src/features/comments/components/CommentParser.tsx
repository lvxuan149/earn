import { Link } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { type CommentType } from '@/interface/comments';
import { isLink } from '@/utils/isLink';
import { truncateString } from '@/utils/truncateString';

interface Props {
  listingSlug: string;
  listingType: string;
  value: string;
  type: CommentType;
  isAnnounced: boolean;
  submissionId?: string;
}

function parseComment(comment: string) {
  const parts = comment.split(/(\s+|@[\w]+)/g).filter(Boolean);
  return parts.map((part) => {
    if (part.startsWith('@') && part.length > 1) {
      return { type: 'mention', value: part };
    } else if (isLink(part)) {
      return { type: 'link', value: part };
    }
    return { type: 'text', value: part };
  });
}

export const CommentParser = ({
  value,
  type,
  submissionId,
  listingSlug,
  listingType,
  isAnnounced,
}: Props) => {
  const { t } = useTranslation('common');
  const parsedComment = parseComment(value);
  if (type === 'SUBMISSION' && submissionId && isAnnounced)
    return (
      <>
        {value} -{' '}
        <Link
          color="brand.purple"
          href={`/listings/${listingType}/${listingSlug}/submission/${submissionId}`}
        >
          {t('commentParser.checkItOut')}
        </Link>
      </>
    );
  return (
    <>
      {parsedComment.map((part, index) => {
        if (part.type === 'mention') {
          return (
            <Link
              key={index}
              color="brand.purple"
              href={`/t/${part.value.substring(1)}`}
            >
              {truncateString(part.value, 12)}
            </Link>
          );
        } else if (part.type === 'link') {
          let href = part.value;
          if (!href.startsWith('http://') && !href.startsWith('https://')) {
            href = 'https://' + href;
          }
          return (
            <Link
              key={index}
              color="blue.600"
              href={href}
              isExternal
              rel="nofollow noreferrer"
            >
              {truncateString(part.value, 30)}
            </Link>
          );
        } else {
          return <span key={index}>{part.value}</span>;
        }
      })}
    </>
  );
};
