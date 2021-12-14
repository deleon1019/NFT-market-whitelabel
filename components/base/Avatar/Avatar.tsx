import React from 'react';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

import Clipboard from 'components/base/Clipboard';
import Button from 'components/ui/Button';
import Icon from 'components/ui/Icon';
import { breakpointMap } from 'style/theme/base';

import Picture from './components/Picture';

export const AVATAR_VARIANT_BANNER = 'banner';
export type AVATAR_VARIANT_TYPE = typeof AVATAR_VARIANT_BANNER;

interface Props {
  className?: string;
  followers?: number;
  followLabel?: string;
  handleFollow?: () => void;
  isAddressDisplayed?: boolean;
  isClickable?: boolean;
  isDiscoverButton?: boolean;
  isFollowButton?: boolean;
  isPictureOnly?: boolean;
  isTooltip?: boolean;
  isUnfollow?: boolean;
  isVerified?: boolean;
  label?: string;
  name: string;
  nickname?: string;
  personalUrl?: string;
  picture?: string;
  twitterName?: string;
  variant?: AVATAR_VARIANT_TYPE;
  walletId?: string;
}

const Avatar = ({
  className,
  followers,
  handleFollow,
  isAddressDisplayed,
  isClickable,
  isDiscoverButton,
  isFollowButton,
  isPictureOnly,
  isTooltip,
  isUnfollow,
  isVerified,
  label,
  name,
  nickname,
  personalUrl,
  picture,
  twitterName,
  variant,
  walletId,
}: Props) => {
  const isTablet = useMediaQuery({
    query: `(max-width: ${breakpointMap.lg - 1}px)`,
  });

  if (isPictureOnly) {
    return (
      <Picture
        isClickable={isClickable}
        isTooltip={isTooltip}
        isVerified={isVerified}
        link={walletId}
        name={name}
        picture={picture}
        variant={variant}
      />
    );
  }

  return (
    <SAvatarContainer className={className} variant={variant}>
      <SAvatarWrapper variant={variant}>
        <Picture
          isClickable={isClickable}
          isTooltip={isTooltip}
          isVerified={isVerified}
          link={walletId}
          name={name}
          picture={picture}
          variant={variant}
        />
        <SDetailsContainer variant={variant}>
          <STopDetails>
            <Link href={`/${walletId}`} passHref>
              <SName variant={variant}>{name}</SName>
            </Link>
            {nickname !== undefined && <SNickname>{nickname}</SNickname>}
          </STopDetails>

          <SBottomDetails>
            {label !== undefined && <SLabel>{label}</SLabel>}
            {followers !== undefined && (
              <SFollowers>{`${followers} followers`}</SFollowers>
            )}
            {twitterName !== undefined && (
              <SLink
                href={`https://twitter.com/${twitterName}`}
                target="_blank"
                title="twitterPage"
                rel="noopener noreferrer"
              >
                <STwitterIcon name="socialTwitter" />
                <STwitterNickname>@{twitterName}</STwitterNickname>
              </SLink>
            )}
            {personalUrl !== undefined && (
              <SLink
                href={personalUrl}
                target="_blank"
                title="personalPage"
                rel="noopener noreferrer"
              >
                {personalUrl.replace(/(^\w+:|^)\/\//, '')}
              </SLink>
            )}
            {isAddressDisplayed && walletId && (
              <Clipboard address={walletId} isEllipsis />
            )}
            {!isTablet && isFollowButton && (
              <SFollowButton
                color={isUnfollow ? 'primaryLight' : 'invertedContrast'}
                onClick={handleFollow}
                size="small"
                text={isUnfollow ? 'Unfollow' : 'Follow'}
              />
            )}
          </SBottomDetails>
        </SDetailsContainer>
      </SAvatarWrapper>
      {isDiscoverButton && (
        <SDiscoverButton
          color="primaryLight"
          href={`/${walletId}`}
          size="small"
          text="Discover"
        />
      )}
      {isTablet && isFollowButton && (
        <SFollowButton
          color={isUnfollow ? 'primaryLight' : 'invertedContrast'}
          onClick={handleFollow}
          size="small"
          text={isUnfollow ? 'Unfollow' : 'Follow'}
        />
      )}
    </SAvatarContainer>
  );
};

const SAvatarContainer = styled.div<{ variant?: AVATAR_VARIANT_TYPE }>`
  display: flex;
  justify-content: space-between;
`;

const SAvatarWrapper = styled.div<{ variant?: AVATAR_VARIANT_TYPE }>`
  width: ${({ variant }) =>
    variant === AVATAR_VARIANT_BANNER ? '100%' : 'auto'};
  display: flex;
  flex-direction: ${({ variant }) =>
    variant === AVATAR_VARIANT_BANNER ? 'column' : 'row'};
  align-items: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
  }
`;

const SDetailsContainer = styled.div<{ variant?: AVATAR_VARIANT_TYPE }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ variant }) =>
    variant === AVATAR_VARIANT_BANNER ? 'center' : 'flex-start'};
  margin-top: ${({ variant }) =>
    variant === AVATAR_VARIANT_BANNER ? '1.6rem' : 0};
  margin-left: ${({ variant }) =>
    variant === AVATAR_VARIANT_BANNER ? 0 : '1.6rem'};

  ${({ theme }) => theme.mediaQueries.lg} {
    align-items: flex-start;
    margin-top: 0;
    margin-left: ${({ variant }) =>
      variant === AVATAR_VARIANT_BANNER ? '3.2rem' : '1.6rem'};
  }
`;

const STopDetails = styled.div`
  display: flex;
  align-items: center;

  > * {
    &:not(:first-child) {
      margin-left: 0.8rem;
    }
  }
`;

const SBottomDetails = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.4rem;

  > * {
    &:not(:first-child) {
      margin-left: 0.8rem;
    }
  }
`;

const SName = styled.a<{ variant?: AVATAR_VARIANT_TYPE }>`
  color: ${({ theme, variant }) =>
    variant === AVATAR_VARIANT_BANNER
      ? theme.colors.primary
      : theme.colors.contrast};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ variant }) =>
    variant === AVATAR_VARIANT_BANNER ? '3.2rem' : '1.6rem'};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }
`;

const SLabel = styled.span`
  color: ${({ theme }) => theme.colors.contrast};
  font-size: 1.6rem;
`;

const SFollowers = styled.span`
  color: ${({ theme }) => theme.colors.neutral300};
  font-size: 1.2rem;
`;

const SNickname = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.6rem;
`;

const SLink = styled.a`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.neutral200};
  font-size: 1.6rem;
`;

const STwitterIcon = styled(Icon)`
  width: 1.4rem;
  height: 1.4rem;
`;

const STwitterNickname = styled.span`
  margin-left: 0.4rem;
`;

const SFollowButton = styled(Button)`
  font-size: 1.2rem;
  padding: 0.4rem 1.2rem;
`;

const SDiscoverButton = styled(Button)`
  margin-left: 0.8rem;
`;

export default Avatar;
