var dt;
let api_info = {
    links: {
        items: {
            "url": "https://developer-lostark.game.onstove.com/markets/items",
            "method": "POST"
        },
    },
    key: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDA1NTcwNTIifQ.UJ5FYuzFns_ju4vjPM05bNChbMlS6kJ8EsrnTtG8gJswM4vo-0Be6u1HB018SaOMXDRkTlerJGDQuXKVyKBiLqdnK4qJIFuXvf_1XJsbfKmvMQL_GG5lefks7tyFVuroXDD60BZX9w5u2NPJSoEHlsLL15jDCXn4Zh2IMejrOsPsbmSORClGEr559q1Q68BswP6ZKe9JoRdqW6v4-TeeVwjJmWFQ0MFFo3OJeocrxFI2PriKClo2XYXtZ6u03NTNzhjkLdGCmbfgzTvGPtzFDdQzmW1_DKamhyMXLz_LiFZPxgKVrKEi1Lg61GrQlu39q3-UfgyqbHIn3on50DpJLg",
}

$(document).ready(function() {
    dt = {
        rewards: {
            ingredient: {}
        },
        _watch: {
            _is_get_rewards: false,
            get is_get_rewards() {
                return this._is_get_rewards;
            },
            set is_get_rewards(_is_get_rewards) {
                // 리워드 데이터를 가져온 후 진행
                if (_is_get_rewards) {
                    dt.matchRaidValue();

                    // 컨텐츠별 템플릿 제작
                    dt.makeContentsValue();
                }
            }
        },
        fragment: {
            66130131: {cnt: 500}, // 명예의 파편 주머니(소)
            66130141: {cnt: 1000}, // 운명의 파편 주머니(소)
            66130111: {cnt: 500}, // 조화의 파편 주머니(소)
            66130121: {cnt: 1500}, // 조화의 파편 주머니(소)
            66130132: {cnt: 1000}, // 명예의 파편 주머니(중)
            66130112: {cnt: 1000}, // 조화의 파편 주머니(중)
            66130122: {cnt: 3000}, // 조화의 파편 주머니(중)
            66130133: {cnt: 1500}, // 명예의 파편 주머니(대)
            66130113: {cnt: 1500}, // 조화의 파편 주머니(대)
            66130123: {cnt: 4500}, // 조화의 파편 주머니(대)
        },
        contents_list: contents_datas,
        cardGroupTemplate: $("#card_group_template").html(),
        cardTemplate: $("#card_template").html(),
        detailTemplate: $("#detail_template").html(),
        seeMoreDetailTemplate: $("#see_more_detail_template").html(),
        gatewayGoldTemplate: $("#gateway_gold_template").html(),
        gatewaySeeMoreTemplate: $("#gateway_see_more_template").html(),
        init: function() {
            dt.getLoaDatas();
        },
        getLoaDatas: function() {

            // 거래소 재료 데이터 호출
            this.getIngredientDatas(1, 1);

        },
        getIngredientDatas: async function(i, total_page) {
            const page_size = 10;

            if (total_page < i) {
                dt._watch.is_get_rewards = true;
                return;
            };

            let data = {
                CategoryCode: 50010,
                PageNo: i,
                SortCondition: 'ASC'
            };

            try {
                const response = await dt.ajax(api_info.links.items, data);

                let result = response;
                response.Items.forEach(function(obj) {
                    var d = {
                        [obj.Id]: {
                            id: obj.Id,
                            nm: obj.Name,
                            price: obj.CurrentMinPrice,
                            once_price: (obj.Id in dt.fragment)? obj.CurrentMinPrice / dt.fragment[obj.Id].cnt : obj.CurrentMinPrice / obj.BundleCount,
                            icon: obj.Icon,
                            bundle_count: obj.BundleCount,
                        }
                    };
                    Object.assign(dt.rewards.ingredient, d);
                });

                // 최초 1회만 계산
                if (i == 1) {
                    total_page = Math.ceil(response.TotalCount / page_size);
                }
                dt.getIngredientDatas(i+1, total_page);

            } catch (error) {
                console.error('AJAX 실패:', error);
            }

        },
        ajax: function(ep, data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: ep.url,
                    type: ep.method,
                    headers: {
                        'accept': 'application/json',
                        'authorization': `bearer ${api_info.key}`
                    },
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    success: function (response) {
                        resolve(response);
                    },
                    error: function (xhr, status, error) {
                        reject(error);
                    }
                });
            });
        },
        matchRaidValue: function() {
            dt.contents_list.forEach(function(raid, i) {

                if (raid.difficulty.hard.is) {
                    // 클리어
                    var arrs = new Array();
                    var cnt = raid.difficulty.hard.clear.length;
                    for (var idx=0; idx < cnt; idx++) {
                        arrs[idx] = [];
                    }
                    var hard = raid.difficulty.hard.clear;
                    hard.forEach(function(rewards, j) {
                        arrs[j] = rewards;
                    });

                    var result = new Object();
                    var sum_gold = 0;
                    var sum_rewards = new Object();

                    arrs.forEach(obj => {
                        sum_gold += obj.gold;
                        Object.keys(obj.ingredient).forEach(key => {
                            // 결과에 동일한 키가 있으면 값을 더하고, 없으면 추가
                            if (result[key]) {
                                result[key] += obj.ingredient[key];
                            } else {
                                result[key] = obj.ingredient[key];
                            }
                        });
                    });
                    sum_rewards.gold = sum_gold;
                    sum_rewards.ingredient = result;
                    dt.contents_list[i].difficulty.hard.clear.push(sum_rewards);

                    // 더보기
                    var arrs = new Array();
                    var cnt = raid.difficulty.hard.see_more.length;
                    for (var idx=0; idx < cnt; idx++) {
                        arrs[idx] = [];
                    }
                    var hard = raid.difficulty.hard.see_more;
                    hard.forEach(function(rewards, j) {
                        arrs[j] = rewards;
                    });

                    var result = new Object();
                    var sum_gold = 0;
                    var sum_rewards = new Object();

                    arrs.forEach(obj => {
                        sum_gold += obj.gold;
                        Object.keys(obj.ingredient).forEach(key => {

                            // 결과에 동일한 키가 있으면 값을 더하고, 없으면 추가
                            if (result[key]) {
                                result[key] += obj.ingredient[key];
                            } else {
                                result[key] = obj.ingredient[key];
                            }
                        });
                    });
                    sum_rewards.gold = sum_gold;
                    sum_rewards.ingredient = result;
                    dt.contents_list[i].difficulty.hard.see_more.push(sum_rewards);
                }

                if (raid.difficulty.normal.is) {
                    // 클리어
                    var arrs = new Array();
                    var cnt = raid.difficulty.normal.clear.length;
                    for (var idx=0; idx < cnt; idx++) {
                        arrs[idx] = [];
                    }
                    var normal = raid.difficulty.normal.clear;
                    normal.forEach(function(rewards, j) {
                        arrs[j] = rewards;
                    });

                    var result = new Object();
                    var sum_gold = 0;
                    var sum_rewards = new Object();

                    arrs.forEach(obj => {
                        sum_gold += obj.gold;
                        Object.keys(obj.ingredient).forEach(key => {

                            // 결과에 동일한 키가 있으면 값을 더하고, 없으면 추가
                            if (result[key]) {
                                result[key] += obj.ingredient[key];
                            } else {
                                result[key] = obj.ingredient[key];
                            }
                        });
                    });
                    sum_rewards.gold = sum_gold;
                    sum_rewards.ingredient = result;
                    dt.contents_list[i].difficulty.normal.clear.push(sum_rewards);

                    // 더보기
                    var arrs = new Array();
                    var cnt = raid.difficulty.normal.see_more.length;
                    for (var idx=0; idx < cnt; idx++) {
                        arrs[idx] = [];
                    }
                    var normal = raid.difficulty.normal.see_more;
                    normal.forEach(function(rewards, j) {
                        arrs[j] = rewards;
                    });

                    var result = new Object();
                    var sum_gold = 0;
                    var sum_rewards = new Object();

                    arrs.forEach(obj => {
                        sum_gold += obj.gold;
                        Object.keys(obj.ingredient).forEach(key => {

                            // 결과에 동일한 키가 있으면 값을 더하고, 없으면 추가
                            if (result[key]) {
                                result[key] += obj.ingredient[key];
                            } else {
                                result[key] = obj.ingredient[key];
                            }
                        });
                    });
                    sum_rewards.gold = sum_gold;
                    sum_rewards.ingredient = result;
                    dt.contents_list[i].difficulty.normal.see_more.push(sum_rewards);
                }
            });

            // dt.setDatas();
        },
        makeContentsValue: function() {
            var _contents_list = dt.contents_list;
            var _ingredients = dt.rewards.ingredient;
            _contents_list.forEach(function(contents) {
                if (contents.difficulty.hard.is) {
                    contents.difficulty.hard.clear.forEach(function(rewards) {
                        Object.keys(rewards.ingredient).forEach(key => {
                            if (_ingredients[key]) {
                                var _datas = JSON.parse(JSON.stringify(_ingredients[key]));;
                                _datas.cnt = rewards.ingredient[key];
                                _datas.total_price = rewards.ingredient[key] * _datas.once_price;
                                rewards.ingredient[key] = _datas;
                            }
                        });
                    });

                    contents.difficulty.hard.see_more.forEach(function(rewards) {
                        Object.keys(rewards.ingredient).forEach(key => {
                            if (_ingredients[key]) {
                                var _datas = JSON.parse(JSON.stringify(_ingredients[key]));;
                                _datas.cnt = rewards.ingredient[key];
                                _datas.total_price = rewards.ingredient[key] * _datas.once_price;
                                rewards.ingredient[key] = _datas;
                            }
                        });
                    });
                }

                if (contents.difficulty.normal.is) {
                    contents.difficulty.normal.clear.forEach(function(rewards) {
                        Object.keys(rewards.ingredient).forEach(key => {
                            if (_ingredients[key]) {
                                var _datas = JSON.parse(JSON.stringify(_ingredients[key]));;
                                _datas.cnt = rewards.ingredient[key];
                                _datas.total_price = rewards.ingredient[key] * _datas.once_price;
                                rewards.ingredient[key] = _datas;
                            }
                        });
                    });

                    contents.difficulty.normal.see_more.forEach(function(rewards) {
                        Object.keys(rewards.ingredient).forEach(key => {
                            if (_ingredients[key]) {
                                var _datas = JSON.parse(JSON.stringify(_ingredients[key]));;
                                _datas.cnt = rewards.ingredient[key];
                                _datas.total_price = rewards.ingredient[key] * _datas.once_price;
                                rewards.ingredient[key] = _datas;
                            }
                        });
                    });
                }
            });

            dt.setDatas();
        },
        setDatas: function() {
            dt.contents_list.forEach(function(contents) {
                var _cGroupTemplate = dt.cardGroupTemplate;
                var _cTemplates = '';
                $.each(contents.difficulty, function(k, difficulty) {
                    if (difficulty.is) {
                        var _cTemplate = dt.cardTemplate;

                        var _difficulty = k == 'normal'? '노말' : k == 'hard'? '하드' : '헬';
                        var _contents_title = `${contents.nm}(${_difficulty})`;

                        var _dTemplates = '';
                        var _smdTemplates = '';
                        difficulty.clear.forEach(function(rewards, idx) {
                            var _cTemplate = dt.cardTemplate;
                            var _dTemplate = dt.detailTemplate;
                            var _ggTemplate = dt.gatewayGoldTemplate;
                            var _gateway = idx + 1;
                            var _title = _gateway != difficulty.clear.length? `${_gateway}관문`:'합계';

                            var _grTemplates = '';
                            var _total_reward_value = 0;
                            $.each(rewards.ingredient, function(key, reward) {
                                if (typeof rewards.ingredient[key] === 'object' && rewards.ingredient[key] !== null) {
                                    _grTemplates += `<p class="card-text"><img src="${rewards.ingredient[key].icon}" style="width: 30px;"> X ${rewards.ingredient[key].cnt.toLocaleString()}: ${rewards.ingredient[key].total_price.toLocaleString()}원</p>`;
                                    _total_reward_value += rewards.ingredient[key].total_price;
                                }
                                else {
                                    _grTemplates += `<p class="card-text">${key} X ${reward}</p>`;
                                }
                            });
                            _ggTemplate = _ggTemplate.replace('{{gold}}', rewards.gold.toLocaleString());
                            _dTemplate = _dTemplate.replace('{{title}}', _title)
                                                   .replace('{{gateway_rewards}}', _grTemplates)
                                                   .replace('{{gateway_gold}}', _ggTemplate);
                            _dTemplates += `<div class="card-group"><div class="card border-primary mb-3">${_dTemplate}</div>`;

                            // 더보기 처리
                            var _gsmTemplates = '';
                            var _smdTemplate = dt.seeMoreDetailTemplate;
                            var _gsmgTemplate = dt.gatewaySeeMoreTemplate;
                            var _total_see_more_reward_value = 0;
                            $.each(difficulty.see_more[idx].ingredient, function(key, reward) {
                                if (typeof difficulty.see_more[idx].ingredient[key] === 'object' && difficulty.see_more[idx].ingredient[key] !== null) {
                                    _gsmTemplates += `<p class="card-text"><img src="${difficulty.see_more[idx].ingredient[key].icon}" style="width: 30px;"> X ${difficulty.see_more[idx].ingredient[key].cnt.toLocaleString()}: ${difficulty.see_more[idx].ingredient[key].total_price.toLocaleString()}원</p>`;
                                    // _total_reward_value += difficulty.see_more[idx].ingredient[key].total_price;
                                }
                                else {
                                    _gsmTemplates += `<p class="card-text">${key} X ${reward}</p>`;
                                }
                            });
                            _gsmgTemplate = _gsmgTemplate.replace('{{gold}}', `<p style="color: red;">-${difficulty.see_more[idx].gold.toLocaleString()}</p>`);
                            _smdTemplate = _smdTemplate.replace('{{title}}', '더보기')
                                .replace('{{see_more_rewards}}', _gsmTemplates)
                                .replace('{{see_more_gold}}', _gsmgTemplate);
                            _dTemplates += `<div class="card border-primary mb-3">${_smdTemplate}</div></div>`;

                            var _details = `${_dTemplates}`;

                            if (_gateway == difficulty.clear.length) {
                                _cTemplate = _cTemplate.replace('{{title}}', _contents_title)
                                                       .replace('{{clear_gold}}', rewards.gold.toLocaleString())
                                                       .replace('{{rewards_value}}', _total_reward_value.toLocaleString())
                                                       // .replace('{{details}}', _dTemplates);
                                                       .replace('{{details}}', _details);

                                _cTemplates += _cTemplate;
                            }
                        });
                    }
                });
                _cGroupTemplate = _cGroupTemplate.replace('{{cards}}', _cTemplates);
                $("#main").append(_cGroupTemplate);
            });
        },
        viewDetail: function(obj) {
            var btn_title = "상세보기";
            if ($(obj).data("view") == "hidden") {
                $(obj).data("view", "show");
                btn_title = "접기";
                $(obj).parent().children(".details").show();
            }
            else {
                $(obj).data("view", "hidden");
                $(obj).parent().children(".details").hide();
            }
            $(obj).html(btn_title);
        }
    };

    dt.init();
});