const contents_datas = [
    {
        nm: "에기르",
        // 난이도
        difficulty: {
            normal: {
                is: true,
                clear: [
                    {
                        gold: 7500,
                        ingredient: {
                            66102006: 480,
                            66102106: 960,
                            66130141: 3600,
                            "업화의 쐐기돌": 4
                        }
                    },
                    {
                        gold: 15500,
                        ingredient: {
                            66102006: 580,
                            66102106: 1160,
                            66130141: 4400,
                            "업화의 쐐기돌": 6
                        }
                    }
                ],
                see_more: [
                    {
                        gold: 3200,
                        ingredient: {
                            66102006: 700,
                            66102106: 1400,
                            66130141: 6500,
                            66110225: 16,
                            "업화의 쐐기돌": 4
                        }
                    },
                    {
                        gold: 5300,
                        ingredient: {
                            66102006: 1000,
                            66102106: 2000,
                            66130141: 9500,
                            66110225: 28,
                            "업화의 쐐기돌": 4
                        }
                    }
                ]
            },
            hard: {
                is: true,
                clear: [
                    {
                        gold: 9000,
                        ingredient: {
                            66102006: 580,
                            66102106: 1160,
                            66130141: 4200,
                            "업화의 쐐기돌": 8
                        }
                    },
                    {
                        gold: 18500,
                        ingredient: {
                            66102006: 660,
                            66102106: 1320,
                            66130141: 5400,
                            "업화의 쐐기돌": 12
                        }
                    }
                ],
                see_more: [
                    {
                        gold: 4100,
                        ingredient: {
                            66102006: 850,
                            66102106: 1700,
                            66130141: 7500,
                            66110225: 28,
                            "업화의 쐐기돌": 8
                        }
                    },
                    {
                        gold: 6600,
                        ingredient: {
                            66102006: 1150,
                            66102106: 2300,
                            66130141: 11000,
                            66110225: 38,
                            "업화의 쐐기돌": 12
                        }
                    }
                ]
            },
        }
    },
    {
        nm: "베히모스",
        difficulty: {
            normal: {
                is: true,
                clear: [
                    {
                        gold: 7000,
                        ingredient: {
                            66102005: 380,
                            66102105: 760,
                            66130131: 5800,
                            "베히모스의 비늘": 10,
                            "마력의 샘물": 10
                        }
                    },
                    {
                        gold: 14500,
                        ingredient: {
                            66102005: 480,
                            66102105: 960,
                            66130131: 7800,
                            "베히모스의 비늘": 20,
                            "마력의 샘물": 18
                        }
                    }
                ],
                see_more: [
                    {
                        gold: 3100,
                        ingredient: {
                            66102005: 1050,
                            66102105: 2100,
                            66130131: 7500,
                            66110224: 31,
                            "베히모스의 비늘": 10,
                            "마력의 샘물": 10
                        }
                    },
                    {
                        gold: 4900,
                        ingredient: {
                            66102005: 1750,
                            66102105: 3500,
                            66130131: 11500,
                            66110224: 49,
                            "베히모스의 비늘": 20,
                            "마력의 샘물": 18
                        }
                    }
                ]
            },
            hard: {
                is: false
            }
        }
    },
    // {
    //     nm: "에키드나",
    //     // 난이도
    //     level: {
    //         normal: {
    //             is: true,
    //             rewards: [
    //                 {
    //                     gold: 5000,
    //                     see_more_gold: 2200,
    //                     ingredient: {
    //                         clear: [
    //                             {66102005: 160},
    //                             {66102105: 320},
    //                             {66130131: 3600},
    //                             {"아그리스의 비늘": 3},
    //                         ],
    //                         see_more: [
    //                             {66102005: 450},
    //                             {66102105: 900},
    //                             {66130131: 6500},
    //                             {66110224: 16},
    //                             {"아그리스의 비늘": 3},
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     gold: 9500,
    //                     see_more_gold: 3400,
    //                     ingredient: {
    //                         clear: [
    //                             {66102005: 220},
    //                             {66102105: 440},
    //                             {66130131: 4200},
    //                             {"아그리스의 비늘": 6},
    //                         ],
    //                         see_more: [
    //                             {66102005: 800},
    //                             {66102105: 1600},
    //                             {66130131: 9500},
    //                             {66110224: 28},
    //                             {"아그리스의 비늘": 6},
    //                         ]
    //                     }
    //                 }
    //             ],
    //         },
    //         hard: {
    //             is: true,
    //             rewards: [
    //                 {
    //                     gold: 6000,
    //                     see_more_gold: 2800,
    //                     ingredient: {
    //                         clear: [
    //                             {66102005: 200},
    //                             {66102105: 400},
    //                             {66130131: 2700},
    //                             {"알키오네의 눈": 3},
    //                         ],
    //                         see_more: [
    //                             {66102005: 550},
    //                             {66102105: 1100},
    //                             {66130131: 3800},
    //                             {66110224: 12},
    //                             {"알키오네의 눈": 3},
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     gold: 12500,
    //                     see_more_gold: 4100,
    //                     ingredient: {
    //                         clear: [
    //                             {66102005: 260},
    //                             {66102105: 520},
    //                             {66130131: 3800},
    //                             {"알키오네의 눈": 6},
    //                         ],
    //                         see_more: [
    //                             {66102005: 850},
    //                             {66102105: 1700},
    //                             {66130131: 5800},
    //                             {66110224: 19},
    //                             {"알키오네의 눈": 6},
    //                         ]
    //                     }
    //                 }
    //             ],
    //         },
    //     }
    // },
    // {
    //     nm: "카멘",
    //     // 난이도
    //     level: {
    //         normal: {
    //             is: true,
    //             rewards: [
    //                 {
    //                     gold: 3500,
    //                     see_more_gold: 1500,
    //                     ingredient: {
    //                         clear: [
    //                             {66102005: 100},
    //                             {66102105: 200},
    //                             {66130131: 2000},
    //                             {"마력의 샘물": 2},
    //                             {"어둠의 불": 3},
    //                         ],
    //                         see_more: [
    //                             {66102005: 380},
    //                             {66102105: 760},
    //                             {66130131: 3500},
    //                             {66110224: 13},
    //                             {"마력의 샘물": 2},
    //                             {"어둠의 불": 3},
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     gold: 4000,
    //                     see_more_gold: 1800,
    //                     ingredient: {
    //                         clear: [
    //                             {66102005: 120},
    //                             {66102105: 240},
    //                             {66130131: 2500},
    //                             {"마력의 샘물": 3},
    //                             {"어둠의 불": 4},
    //                         ],
    //                         see_more: [
    //                             {66102005: 450},
    //                             {66102105: 900},
    //                             {66130131: 4500},
    //                             {66110224: 16},
    //                             {"마력의 샘물": 3},
    //                             {"어둠의 불": 4},
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     gold: 5500,
    //                     see_more_gold: 2500,
    //                     ingredient: {
    //                         clear: [
    //                             {66102005: 150},
    //                             {66102105: 300},
    //                             {66130131: 3000},
    //                             {"마력의 샘물": 4},
    //                             {"어둠의 불": 6},
    //                         ],
    //                         see_more: [
    //                             {66102005: 600},
    //                             {66102105: 1200},
    //                             {66130131: 6000},
    //                             {66110224: 20},
    //                             {"마력의 샘물": 4},
    //                             {"어둠의 불": 6},
    //                         ]
    //                     }
    //                 }
    //             ],
    //         },
    //         hard: {
    //             is: true,
    //             rewards: [
    //                 {
    //                     gold: 5000,
    //                     see_more_gold: 2000,
    //                     ingredient: {
    //                         clear: [
    //                             {66102005: 150},
    //                             {66102105: 300},
    //                             {66130131: 2400},
    //                             {"마력의 샘물": 6},
    //                             {"어둠의 불": 6},
    //                         ],
    //                         see_more: [
    //                             {66102005: 500},
    //                             {66102105: 1000},
    //                             {66130131: 5000},
    //                             {66110224: 15},
    //                             {"마력의 샘물": 6},
    //                             {"어둠의 불": 6},
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     gold: 6000,
    //                     see_more_gold: 2400,
    //                     ingredient: {
    //                         clear: [
    //                             {66102005: 200},
    //                             {66102105: 400},
    //                             {66130131: 3000},
    //                             {"마력의 샘물": 9},
    //                             {"어둠의 불": 8},
    //                         ],
    //                         see_more: [
    //                             {66102005: 600},
    //                             {66102105: 1200},
    //                             {66130131: 6000},
    //                             {66110224: 21},
    //                             {"마력의 샘물": 9},
    //                             {"어둠의 불": 8},
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     gold: 9000,
    //                     see_more_gold: 2800,
    //                     ingredient: {
    //                         clear: [
    //                             {66102005: 240},
    //                             {66102105: 480},
    //                             {66130131: 3600},
    //                             {"마력의 샘물": 12},
    //                             {"어둠의 불": 12},
    //                         ],
    //                         see_more: [
    //                             {66102005: 700},
    //                             {66102105: 1400},
    //                             {66130131: 7500},
    //                             {66110224: 27},
    //                             {"마력의 샘물": 12},
    //                             {"어둠의 불": 12},
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     gold: 21000,
    //                     see_more_gold: 3600,
    //                     ingredient: {
    //                         clear: [
    //                             {66102005: 300},
    //                             {66102105: 600},
    //                             {66130131: 4500},
    //                             {"마력의 샘물": 12},
    //                             {"어둠의 불": 12},
    //                         ],
    //                         see_more: [
    //                             {66102005: 850},
    //                             {66102105: 1700},
    //                             {66130131: 9000},
    //                             {66110224: 34},
    //                             {"마력의 샘물": 12},
    //                             {"어둠의 불": 12},
    //                         ]
    //                     }
    //                 }
    //             ],
    //         },
    //     }
    // },
    // {
    //     nm: "일리아칸",
    //     // 난이도
    //     level: {
    //         normal: {
    //             is: true,
    //             rewards: [
    //                 {
    //                     gold: 1000,
    //                     see_more_gold: 450,
    //                     ingredient: {
    //                         clear: [
    //                             {66102005: 120},
    //                             {66102105: 240},
    //                             {66130131: 1200},
    //                             {"쇠락의 눈동자": 3},
    //                             {"질병의 표식": 75},
    //                         ],
    //                         see_more: [
    //                             {66102005: 120},
    //                             {66102105: 240},
    //                             {66130131: 3000},
    //                             {66110224: 6},
    //                             {"쇠락의 눈동자": 3},
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     gold: 1800,
    //                     see_more_gold: 550,
    //                     ingredient: {
    //                         clear: [
    //                             {66102005: 160},
    //                             {66102105: 320},
    //                             {66130131: 1600},
    //                             {"쇠락의 눈동자": 3},
    //                             {"질병의 표식": 75},
    //                         ],
    //                         see_more: [
    //                             {66102005: 160},
    //                             {66102105: 320},
    //                             {66130131: 3000},
    //                             {66110224: 8},
    //                             {"쇠락의 눈동자": 3},
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     gold: 2600,
    //                     see_more_gold: 750,
    //                     ingredient: {
    //                         clear: [
    //                             {66102005: 240},
    //                             {66102105: 480},
    //                             {66130131: 2400},
    //                             {"쇠락의 눈동자": 5},
    //                             {"질병의 표식": 100},
    //                         ],
    //                         see_more: [
    //                             {66102005: 240},
    //                             {66102105: 480},
    //                             {66130131: 4200},
    //                             {66110224: 8},
    //                             {"쇠락의 눈동자": 5},
    //                         ]
    //                     }
    //                 }
    //             ],
    //         },
    //         hard: {
    //             is: true,
    //             rewards: [
    //                 {
    //                     gold: 1500,
    //                     see_more_gold: 600,
    //                     ingredient: {
    //                         clear: [
    //                             {66102005: 180},
    //                             {66102105: 360},
    //                             {66130131: 2400},
    //                             {"쇠락의 눈동자": 7},
    //                             {"질병의 표식": 75},
    //                         ],
    //                         see_more: [
    //                             {66102005: 200},
    //                             {66102105: 400},
    //                             {66130131: 4000},
    //                             {66110224: 9},
    //                             {"쇠락의 눈동자": 7},
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     gold: 2500,
    //                     see_more_gold: 700,
    //                     ingredient: {
    //                         clear: [
    //                             {66102005: 200},
    //                             {66102105: 400},
    //                             {66130131: 2400},
    //                             {"쇠락의 눈동자": 7},
    //                             {"질병의 표식": 75},
    //                         ],
    //                         see_more: [
    //                             {66102005: 240},
    //                             {66102105: 480},
    //                             {66130131: 4000},
    //                             {66110224: 12},
    //                             {"쇠락의 눈동자": 7},
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     gold: 3500,
    //                     see_more_gold: 950,
    //                     ingredient: {
    //                         clear: [
    //                             {66102005: 280},
    //                             {66102105: 560},
    //                             {66130131: 4000},
    //                             {"쇠락의 눈동자": 8},
    //                             {"질병의 표식": 100},
    //                         ],
    //                         see_more: [
    //                             {66102005: 360},
    //                             {66102105: 720},
    //                             {66130131: 5500},
    //                             {66110224: 18},
    //                             {"쇠락의 눈동자": 8},
    //                         ]
    //                     }
    //                 }
    //             ],
    //         },
    //     }
    // },
    // {
    //     nm: "아브렐슈드",
    //     // 난이도
    //     level: {
    //         normal: {
    //             is: true,
    //             rewards: [
    //                 {
    //                     gold: 1000,
    //                     see_more_gold: 250,
    //                     ingredient: {
    //                         clear: [
    //                             {66102004: 60},
    //                             {66102104: 120},
    //                             {66130131: 800},
    //                             {"몽환의 사념": 4},
    //                             {"몽환의 표식": 70},
    //                         ],
    //                         see_more: [
    //                             {66102004: 120},
    //                             {66102104: 240},
    //                             {66130131: 2100},
    //                             {66110223: 6},
    //                             {"몽환의 사념": 4},
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     gold: 1000,
    //                     see_more_gold: 300,
    //                     ingredient: {
    //                         clear: [
    //                             {66102004: 60},
    //                             {66102104: 120},
    //                             {66130131: 800},
    //                             {"몽환의 사념": 4},
    //                             {"몽환의 표식": 70},
    //                         ],
    //                         see_more: [
    //                             {66102004: 150},
    //                             {66102104: 300},
    //                             {66130131: 2400},
    //                             {66110223: 9},
    //                             {"몽환의 사념": 4},
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     gold: 1000,
    //                     see_more_gold: 400,
    //                     ingredient: {
    //                         clear: [
    //                             {66102004: 120},
    //                             {66102104: 240},
    //                             {66130131: 1500},
    //                             {"몽환의 사념": 5},
    //                             {"몽환의 표식": 100},
    //                         ],
    //                         see_more: [
    //                             {66102004: 200},
    //                             {66102104: 400},
    //                             {66130131: 2800},
    //                             {66110223: 8},
    //                             {"몽환의 사념": 5},
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     gold: 1600,
    //                     see_more_gold: 600,
    //                     ingredient: {
    //                         clear: [
    //                             {66102004: 400},
    //                             {66102104: 800},
    //                             {66130131: 3000},
    //                             {"몽환의 사념": 7},
    //                         ],
    //                         see_more: [
    //                             {66102004: 600},
    //                             {66102104: 1200},
    //                             {66130131: 7000},
    //                             {66110223: 27},
    //                             {"몽환의 사념": 7},
    //                         ]
    //                     }
    //                 },
    //             ],
    //         },
    //         hard: {
    //             is: true,
    //             rewards: [
    //                 {
    //                     gold: 1200,
    //                     see_more_gold: 400,
    //                     ingredient: {
    //                         clear: [
    //                             {66102004: 280},
    //                             {66102104: 560},
    //                             {66130131: 2500},
    //                             {"몽환의 사념": 6},
    //                             {"몽환의 표식": 70},
    //                         ],
    //                         see_more: [
    //                             {66102004: 260},
    //                             {66102104: 520},
    //                             {66130131: 3000},
    //                             {66110223: 12},
    //                             {"몽환의 사념": 6},
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     gold: 1200,
    //                     see_more_gold: 400,
    //                     ingredient: {
    //                         clear: [
    //                             {66102004: 320},
    //                             {66102104: 640},
    //                             {66130131: 2500},
    //                             {"몽환의 사념": 6},
    //                             {"몽환의 표식": 80},
    //                         ],
    //                         see_more: [
    //                             {66102004: 420},
    //                             {66102104: 840},
    //                             {66130131: 4000},
    //                             {66110223: 16},
    //                             {"몽환의 사념": 6},
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     gold: 1200,
    //                     see_more_gold: 500,
    //                     ingredient: {
    //                         clear: [
    //                             {66102004: 400},
    //                             {66102104: 800},
    //                             {66130131: 3000},
    //                             {"몽환의 사념": 7},
    //                             {"몽환의 표식": 100},
    //                         ],
    //                         see_more: [
    //                             {66102004: 640},
    //                             {66102104: 1280},
    //                             {66130131: 5200},
    //                             {66110223: 24},
    //                             {"몽환의 사념": 7},
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     gold: 2000,
    //                     see_more_gold: 800,
    //                     ingredient: {
    //                         clear: [
    //                             {66102004: 800},
    //                             {66102104: 1600},
    //                             {66130131: 6000},
    //                             {"몽환의 사념": 10},
    //                         ],
    //                         see_more: [
    //                             {66102004: 1000},
    //                             {66102104: 2000},
    //                             {66130131: 10000},
    //                             {66110223: 40},
    //                             {"몽환의 사념": 10},
    //                         ]
    //                     }
    //                 },
    //             ],
    //         },
    //     }
    // },
    // {
    //     nm: "쿠크세이튼",
    //     // 난이도
    //     level: {
    //         normal: {
    //             is: true,
    //             rewards: [
    //                 {
    //                     gold: 600,
    //                     see_more_gold: 300,
    //                     ingredient: {
    //                         clear: [
    //                             {66102004: 200},
    //                             {66102104: 400},
    //                             {66130131: 800},
    //                             {"광기의 나팔": 1},
    //                             {"광기의 표식": 50},
    //                         ],
    //                         see_more: [
    //                             {66102004: 300},
    //                             {66102104: 600},
    //                             {66130131: 1300},
    //                             {66110222: 12},
    //                             {"광기의 나팔": 1},
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     gold: 900,
    //                     see_more_gold: 500,
    //                     ingredient: {
    //                         clear: [
    //                             {66102004: 200},
    //                             {66102104: 400},
    //                             {66130131: 800},
    //                             {"광기의 나팔": 2},
    //                             {"광기의 표식": 50},
    //                         ],
    //                         see_more: [
    //                             {66102004: 420},
    //                             {66102104: 840},
    //                             {66130131: 1300},
    //                             {66110222: 12},
    //                             {"광기의 나팔": 2},
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     gold: 1500,
    //                     see_more_gold: 700,
    //                     ingredient: {
    //                         clear: [
    //                             {66102004: 280},
    //                             {66102104: 560},
    //                             {66130131: 800},
    //                             {"광기의 나팔": 2},
    //                             {"광기의 표식": 100},
    //                         ],
    //                         see_more: [
    //                             {66102004: 540},
    //                             {66102104: 1080},
    //                             {66130131: 1600},
    //                             {66110222: 12},
    //                             {"광기의 나팔": 2},
    //                         ]
    //                     }
    //                 },
    //             ],
    //         },
    //         hard: {
    //             is: false,
    //         },
    //     }
    // },
    // {
    //     nm: "비아키스",
    //     // 난이도
    //     level: {
    //         normal: {
    //             is: true,
    //             rewards: [
    //                 {
    //                     gold: 600,
    //                     see_more_gold: 300,
    //                     ingredient: {
    //                         clear: [
    //                             {66102004: 150},
    //                             {66102104: 300},
    //                             {66130131: 480},
    //                             {"욕망의 송곳니": 2},
    //                             {"욕망의 날개": 1},
    //                         ],
    //                         see_more: [
    //                             {66102004: 300},
    //                             {66102104: 600},
    //                             {66130131: 1300},
    //                             {66110222: 12},
    //                             {"욕망의 송곳니": 2},
    //                             {"욕망의 날개": 1},
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     gold: 600,
    //                     see_more_gold: 300,
    //                     ingredient: {
    //                         clear: [
    //                             {66102004: 200},
    //                             {66102104: 400},
    //                             {66130131: 800},
    //                             {"욕망의 송곳니": 2},
    //                             {"욕망의 날개": 1},
    //                         ],
    //                         see_more: [
    //                             {66102004: 300},
    //                             {66102104: 600},
    //                             {66130131: 1300},
    //                             {66110222: 12},
    //                             {"욕망의 송곳니": 2},
    //                             {"욕망의 날개": 1},
    //                         ]
    //                     }
    //                 },
    //             ],
    //         },
    //         hard: {
    //             is: false,
    //         },
    //     }
    // },
];