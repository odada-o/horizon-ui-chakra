import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Flex, Icon, Image, Link, Text, useColorModeValue } from '@chakra-ui/react';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';

export default function NFT() {
    const [nftData, setNftData] = useState(null);
    const [like, setLike] = useState(false);
    const textColor = useColorModeValue('navy.700', 'white');
    const textColorBid = useColorModeValue('brand.500', 'white');

    useEffect(() => {
        axios
            .get('https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20')
            .then((response) => {
                // 여기에서는 첫 번째 아이템만 사용합니다
                const firstItem = response.data.assets[0];
                setNftData({
                    imageUrl: firstItem.image_url,
                    nftName: firstItem.name,
                    author: firstItem.creator?.user?.username || 'Unknown',
                    currentBid: `${firstItem.last_sale?.payment_token?.usd_price || 'Unknown'} USD`,
                    downloadLink: firstItem.permalink,
                });
            })
            .catch((error) => {
                console.error('NFT 데이터를 불러오는 데 실패했습니다.', error);
            });
    }, []);

    if (!nftData) {
        return <div>Loading...</div>;
    }

    return (
        <Box p="20px">
            <Flex direction={{ base: 'column' }} justify="center">
                <Box mb={{ base: '20px', '2xl': '20px' }} position="relative">
                    <Image
                        src={nftData.imageUrl}
                        w={{ base: '100%', '3xl': '100%' }}
                        h={{ base: '100%', '3xl': '100%' }}
                        borderRadius="20px"
                    />
                    <Button
                        position="absolute"
                        bg="white"
                        _hover={{ bg: 'whiteAlpha.900' }}
                        _active={{ bg: 'white' }}
                        _focus={{ bg: 'white' }}
                        p="0px !important"
                        top="14px"
                        right="14px"
                        borderRadius="50%"
                        minW="36px"
                        h="36px"
                        onClick={() => setLike(!like)}
                    >
                        <Icon
                            transition="0.2s linear"
                            w="20px"
                            h="20px"
                            as={like ? IoHeart : IoHeartOutline}
                            color="brand.500"
                        />
                    </Button>
                </Box>
                <Flex flexDirection="column" justify="space-between" h="100%">
                    <Flex
                        justify="space-between"
                        direction={{
                            base: 'row',
                            md: 'column',
                            lg: 'row',
                            xl: 'column',
                            '2xl': 'row',
                        }}
                        mb="auto"
                    >
                        <Flex direction="column">
                            <Text
                                color={textColor}
                                fontSize={{
                                    base: 'xl',
                                    md: 'lg',
                                    lg: 'lg',
                                    xl: 'lg',
                                    '2xl': 'md',
                                    '3xl': 'lg',
                                }}
                                mb="5px"
                                fontWeight="bold"
                                me="14px"
                            >
                                {nftData.nftName}
                            </Text>
                            <Text color="secondaryGray.600" fontSize={{ base: 'sm' }} fontWeight="400" me="14px">
                                {nftData.author}
                            </Text>
                        </Flex>
                        {/* 여기서는 입찰자 정보를 표시하지 않습니다 */}
                    </Flex>
                    <Flex
                        align="start"
                        justify="space-between"
                        direction={{
                            base: 'row',
                            md: 'column',
                            lg: 'row',
                            xl: 'column',
                            '2xl': 'row',
                        }}
                        mt="25px"
                    >
                        <Text fontWeight="700" fontSize="sm" color={textColorBid}>
                            Current Bid: {nftData.currentBid}
                        </Text>
                        <Link href={nftData.downloadLink} isExternal>
                            <Button
                                variant="darkBrand"
                                color="white"
                                fontSize="sm"
                                fontWeight="500"
                                borderRadius="70px"
                                px="24px"
                                py="5px"
                            >
                                View on OpenSea
                            </Button>
                        </Link>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
}
