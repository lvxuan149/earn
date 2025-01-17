import {
  AbsoluteCenter,
  Button,
  Divider,
  Flex,
  HStack,
  Image,
  Link,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { usePostHog } from 'posthog-js/react';
import React from 'react';

import { UserMenu } from '@/features/navbar';
import { useUser } from '@/store/user';

import { NAV_LINKS } from '../utils';

export const DesktopNavbar = () => {
  const { data: session, status } = useSession();
  const { t } = useTranslation('common');

  const { user } = useUser();

  const posthog = usePostHog();

  const router = useRouter();

  const isDashboardRoute = router.pathname.startsWith('/dashboard');
  const maxWValue = isDashboardRoute ? '' : '7xl';

  return (
    <Flex
      display={{ base: 'none', lg: 'flex' }}
      px={{ base: '2', lg: 6 }}
      color="brand.slate.500"
      bg="white"
      borderBottom="1px solid"
      borderBottomColor="blackAlpha.200"
    >
      <Flex justify={'space-between'} w="100%" maxW={maxWValue} mx="auto">
        <Flex align="center" gap={6}>
          <Link
            as={NextLink}
            alignItems={'center'}
            gap={3}
            display={'flex'}
            mr={5}
            _hover={{ textDecoration: 'none' }}
            href="/"
            onClick={() => {
              posthog.capture('homepage logo click_universal');
            }}
          >
            <Image
              h={5}
              cursor="pointer"
              objectFit={'contain'}
              alt={t('desktopNavbar.logoAlt')}
              src={'/assets/logo/logo.svg'}
            />

            <>
              <Divider
                w={'3px'}
                h={'24px'}
                borderColor={'brand.slate.400'}
                orientation="vertical"
              />
              <Text
                color={'brand.slate.500'}
                fontSize="sm"
                fontWeight={600}
                letterSpacing={'1.5px'}
              >
                {t('desktopNavbar.sponsors')}
              </Text>
            </>
          </Link>
        </Flex>
        <AbsoluteCenter>
          <Flex align="center" justify={'center'} flexGrow={1} h="full" ml={10}>
            <Stack direction={'row'} h="full" spacing={7}>
              {NAV_LINKS?.map((navItem) => {
                return (
                  <Link
                    key={navItem.label}
                    alignItems={'center'}
                    display={'flex'}
                    h={{ base: '8', lg: 14 }}
                    py={2}
                    color="brand.slate.500"
                    fontSize={{ base: 'lg', lg: 'sm' }}
                    fontWeight={500}
                    _hover={{
                      textDecoration: 'none',
                      color: 'brand.slate.600',
                    }}
                    href={navItem.link ?? '#'}
                  >
                    {t(`nav.${navItem.label.toLowerCase()}`)}
                  </Link>
                );
              })}
            </Stack>
          </Flex>
        </AbsoluteCenter>

        <Stack
          align="center"
          justify={'flex-end'}
          direction={'row'}
          flex={1}
          py={2}
          spacing={4}
        >
          {status === 'loading' && !session && (
            <Flex align={'center'} gap={2}>
              <SkeletonCircle size="10" />
              <SkeletonText w={'80px'} noOfLines={1} />
            </Flex>
          )}

          <HStack gap={2}>
            <HStack gap={0}>
              {status === 'authenticated' && !!user?.currentSponsorId && (
                <Link
                  className="ph-no-capture"
                  as={NextLink}
                  href="/dashboard/listings/?open=1"
                  onClick={() => posthog.capture('create a listing_navbar')}
                >
                  <Button
                    color="#4F46E5"
                    fontWeight={600}
                    bg={'white'}
                    size="sm"
                  >
                    {t('desktopNavbar.createListing')}
                  </Button>
                </Link>
              )}
              {status === 'authenticated' && !user?.currentSponsorId && (
                <Link
                  className="ph-no-capture"
                  as={NextLink}
                  href="/new/sponsor/"
                  onClick={() => posthog.capture('get started_sponsor navbar')}
                >
                  <Button
                    color="#4F46E5"
                    fontWeight={600}
                    bg={'white'}
                    size="sm"
                  >
                    {t('desktopNavbar.getStarted')}
                  </Button>
                </Link>
              )}
              {status === 'authenticated' && session && <UserMenu />}
            </HStack>
          </HStack>

          {status === 'unauthenticated' && !session && (
            <HStack gap={2}>
              <HStack gap={0}>
                <Link
                  className="ph-no-capture"
                  as={NextLink}
                  href="/new/sponsor/"
                  onClick={() => posthog.capture('login_navbar')}
                >
                  <Button fontSize="xs" size="sm" variant={'ghost'}>
                    {t('desktopNavbar.login')}
                  </Button>
                </Link>
                <Link
                  className="ph-no-capture"
                  as={NextLink}
                  href="/new/sponsor/"
                  onClick={() => posthog.capture('get started_sponsor navbar')}
                >
                  <Button
                    color="#4F46E5"
                    fontWeight={600}
                    bg={'white'}
                    size="sm"
                  >
                    {t('desktopNavbar.getStarted')}
                  </Button>
                </Link>
              </HStack>
            </HStack>
          )}
        </Stack>
      </Flex>
    </Flex>
  );
};
