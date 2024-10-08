var dt;
let api_info = {
  links: {
    items: {
      url: "https://developer-lostark.game.onstove.com/markets/items",
      method: "POST",
    },
  },
  key: localStorage.getItem("apiKey"),
};

$(document).ready(function () {
  dt = {
    rewards: {
      ingredient: {},
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
      },
    },
    fragment: {
      66130131: { cnt: 500 }, // 명예의 파편 주머니(소)
      66130141: { cnt: 1000 }, // 운명의 파편 주머니(소)
      66130142: { cnt: 2000 }, // 운명의 파편 주머니(중)
      66130111: { cnt: 500 }, // 조화의 파편 주머니(소)
      66130121: { cnt: 1500 }, // 조화의 파편 주머니(소)
      66130132: { cnt: 1000 }, // 명예의 파편 주머니(중)
      66130112: { cnt: 1000 }, // 조화의 파편 주머니(중)
      66130122: { cnt: 3000 }, // 조화의 파편 주머니(중)
      66130133: { cnt: 1500 }, // 명예의 파편 주머니(대)
      66130113: { cnt: 1500 }, // 조화의 파편 주머니(대)
      66130123: { cnt: 4500 }, // 조화의 파편 주머니(대)
    },
    contents_list: JSON.parse(JSON.stringify(contents_datas)),
    cardGroupTemplate: $("#card_group_template").html(),
    cardTemplate: $("#card_template").html(),
    detailTemplate: $("#detail_template").html(),
    seeMoreDetailTemplate: $("#see_more_detail_template").html(),
    gatewayGoldTemplate: $("#gateway_gold_template").html(),
    gatewaySeeMoreTemplate: $("#gateway_see_more_template").html(),
    init: function () {
      dt.getLoaDatas();
    },
    getLoaDatas: function () {
      // 거래소 재료 데이터 호출
      this.getIngredientDatas(1, 1);
    },
    getIngredientDatas: async function (i, total_page) {
      const page_size = 10;

      if (total_page < i) {
        dt._watch.is_get_rewards = true;
        return;
      }

      let data = {
        CategoryCode: 50010,
        PageNo: i,
        SortCondition: "ASC",
      };

      try {
        const response = await dt.ajax(api_info.links.items, data);

        let result = response;
        response.Items.forEach(function (obj) {
          var d = {
            [obj.Id]: {
              id: obj.Id,
              nm: obj.Name,
              price: obj.CurrentMinPrice,
              once_price:
                obj.Id in dt.fragment
                  ? obj.CurrentMinPrice / dt.fragment[obj.Id].cnt
                  : obj.CurrentMinPrice / obj.BundleCount,
              icon: obj.Icon,
              bundle_count: obj.BundleCount,
            },
          };
          Object.assign(dt.rewards.ingredient, d);
        });

        // 최초 1회만 계산
        if (i == 1) {
          total_page = Math.ceil(response.TotalCount / page_size);
        }
        dt.getIngredientDatas(i + 1, total_page);
      } catch (error) {
        // console.error('AJAX 실패:', error);

        // API 연동에 실패한 경우에도 골드 보상 정보를 출력하기 위해 진행
        dt._watch.is_get_rewards = true;
        return;
      }
    },
    ajax: function (ep, data) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: ep.url,
          type: ep.method,
          headers: {
            accept: "application/json",
            authorization: `bearer ${api_info.key}`,
          },
          contentType: "application/json",
          data: JSON.stringify(data),
          success: function (response) {
            resolve(response);
          },
          error: function (xhr, status, error) {
            reject(error);
          },
        });
      });
    },
    matchRaidValue: function () {
      dt.contents_list.forEach(function (raid, i) {
        if (raid.difficulty.hard.is) {
          // 클리어
          var arrs = new Array();
          var cnt = raid.difficulty.hard.clear.length;
          for (var idx = 0; idx < cnt; idx++) {
            arrs[idx] = [];
          }
          var hard = raid.difficulty.hard.clear;
          hard.forEach(function (rewards, j) {
            arrs[j] = rewards;
          });

          var result = new Object();
          var sum_gold = 0;
          var sum_rewards = new Object();

          arrs.forEach((obj) => {
            sum_gold += obj.gold;
            Object.keys(obj.ingredient).forEach((key) => {
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
          for (var idx = 0; idx < cnt; idx++) {
            arrs[idx] = [];
          }
          var hard = raid.difficulty.hard.see_more;
          hard.forEach(function (rewards, j) {
            arrs[j] = rewards;
          });

          var result = new Object();
          var sum_gold = 0;
          var sum_rewards = new Object();

          arrs.forEach((obj) => {
            sum_gold += obj.gold;
            Object.keys(obj.ingredient).forEach((key) => {
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
          for (var idx = 0; idx < cnt; idx++) {
            arrs[idx] = [];
          }
          var normal = raid.difficulty.normal.clear;
          normal.forEach(function (rewards, j) {
            arrs[j] = rewards;
          });

          var result = new Object();
          var sum_gold = 0;
          var sum_rewards = new Object();

          arrs.forEach((obj) => {
            sum_gold += obj.gold;
            Object.keys(obj.ingredient).forEach((key) => {
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
          for (var idx = 0; idx < cnt; idx++) {
            arrs[idx] = [];
          }
          var normal = raid.difficulty.normal.see_more;
          normal.forEach(function (rewards, j) {
            arrs[j] = rewards;
          });

          var result = new Object();
          var sum_gold = 0;
          var sum_rewards = new Object();

          arrs.forEach((obj) => {
            sum_gold += obj.gold;
            Object.keys(obj.ingredient).forEach((key) => {
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
    makeContentsValue: function () {
      var _contents_list = dt.contents_list;
      var _ingredients = dt.rewards.ingredient;
      _contents_list.forEach(function (contents) {
        if (contents.difficulty.hard.is) {
          contents.difficulty.hard.clear.forEach(function (rewards) {
            Object.keys(rewards.ingredient).forEach((key) => {
              if (_ingredients[key]) {
                var _datas = JSON.parse(JSON.stringify(_ingredients[key]));
                _datas.cnt = rewards.ingredient[key];
                _datas.total_price =
                  rewards.ingredient[key] * _datas.once_price;
                rewards.ingredient[key] = _datas;
              }
            });
          });

          contents.difficulty.hard.see_more.forEach(function (rewards) {
            Object.keys(rewards.ingredient).forEach((key) => {
              if (_ingredients[key]) {
                var _datas = JSON.parse(JSON.stringify(_ingredients[key]));
                _datas.cnt = rewards.ingredient[key];
                _datas.total_price =
                  rewards.ingredient[key] * _datas.once_price;
                rewards.ingredient[key] = _datas;
              }
            });
          });
        }

        if (contents.difficulty.normal.is) {
          contents.difficulty.normal.clear.forEach(function (rewards) {
            Object.keys(rewards.ingredient).forEach((key) => {
              if (_ingredients[key]) {
                var _datas = JSON.parse(JSON.stringify(_ingredients[key]));
                _datas.cnt = rewards.ingredient[key];
                _datas.total_price =
                  rewards.ingredient[key] * _datas.once_price;
                rewards.ingredient[key] = _datas;
              }
            });
          });

          contents.difficulty.normal.see_more.forEach(function (rewards) {
            Object.keys(rewards.ingredient).forEach((key) => {
              if (_ingredients[key]) {
                var _datas = JSON.parse(JSON.stringify(_ingredients[key]));
                _datas.cnt = rewards.ingredient[key];
                _datas.total_price =
                  rewards.ingredient[key] * _datas.once_price;
                rewards.ingredient[key] = _datas;
              }
            });
          });
        }
      });

      dt.setDatas();

      // 더보기 체크 유무
      var _smc = localStorage.getItem("smc");
      if (_smc == 1) {
        $(".all-see-more-checkbox").prop("checked", _smc);
      }
      dt.allCheckSeeMore(".all-see-more-checkbox");
    },
    setDatas: function () {
      var _isSetKey = localStorage.getItem("isSetKey");
      $("#main").append(
        '<div class="mb-2"><button class="btn-primary btn-sm" onclick="dt.setApiKey()">API KEY 등록/변경</button></div>'
      );
      $("#main").append(
        '<div class="mb-3">전체 더보기 <input type="checkbox" class="all-see-more-checkbox" onchange="dt.allCheckSeeMore(this)"></div>'
      );
      dt.contents_list.forEach(function (contents) {
        var _cGroupTemplate = dt.cardGroupTemplate;
        var _cTemplates = "";
        $.each(contents.difficulty, function (k, difficulty) {
          if (difficulty.is) {
            var _cTemplate = dt.cardTemplate;

            var _difficulty =
              k == "normal" ? "노말" : k == "hard" ? "하드" : "헬";
            var _contents_title = `${contents.nm}(${_difficulty})`;

            var _dTemplates = "";
            var _smdTemplates = "";
            difficulty.clear.forEach(function (rewards, idx) {
              var _cTemplate = dt.cardTemplate;
              var _dTemplate = dt.detailTemplate;
              var _ggTemplate = dt.gatewayGoldTemplate;
              var _gateway = idx + 1;
              var _title =
                _gateway != difficulty.clear.length
                  ? `${_gateway}관문`
                  : "합계";

              var _grTemplates = "";
              var _total_reward_value = 0;
              $.each(rewards.ingredient, function (key, reward) {
                if (
                  typeof rewards.ingredient[key] === "object" &&
                  rewards.ingredient[key] !== null
                ) {
                  _grTemplates += `<p class="card-text"><img src="${
                    rewards.ingredient[key].icon
                  }" style="width: 30px;"> X ${rewards.ingredient[
                    key
                  ].cnt.toLocaleString()}: ${rewards.ingredient[
                    key
                  ].total_price.toLocaleString()}원</p>`;
                  _total_reward_value += rewards.ingredient[key].total_price;
                } else {
                  _grTemplates += `<p class="card-text">${key} X ${reward}</p>`;
                }
              });
              _ggTemplate = _ggTemplate.replace(
                "{{gold}}",
                rewards.gold.toLocaleString()
              );
              _dTemplate = _dTemplate
                .replace("{{title}}", _title)
                .replace("{{gateway_rewards}}", _grTemplates)
                .replace("{{gateway_gold}}", _ggTemplate);
              _dTemplates += `<div class="card-group"><div class="card border-primary">${_dTemplate}</div>`;

              // 더보기 처리
              var _gsmTemplates = "";
              var _smdTemplate = dt.seeMoreDetailTemplate;
              var _gsmgTemplate = dt.gatewaySeeMoreTemplate;
              var _total_see_more_value = 0;
              var _total_see_more_reward_value = 0;
              $.each(
                difficulty.see_more[idx].ingredient,
                function (key, reward) {
                  if (
                    typeof difficulty.see_more[idx].ingredient[key] ===
                      "object" &&
                    difficulty.see_more[idx].ingredient[key] !== null
                  ) {
                    _gsmTemplates += `<p class="card-text"><img src="${
                      difficulty.see_more[idx].ingredient[key].icon
                    }" style="width: 30px;"> X ${difficulty.see_more[
                      idx
                    ].ingredient[
                      key
                    ].cnt.toLocaleString()}: ${difficulty.see_more[
                      idx
                    ].ingredient[key].total_price.toLocaleString()}원</p>`;
                    _total_see_more_value +=
                      difficulty.see_more[idx].ingredient[key].total_price;
                  } else {
                    _gsmTemplates += `<p class="card-text">${key} X ${reward}</p>`;
                  }
                }
              );

              var _total_clear_value = 0;
              var _total_value = 0;

              _total_clear_value = rewards.gold + _total_reward_value;
              _total_value = _total_clear_value + _total_see_more_value;

              _gsmgTemplate = _gsmgTemplate.replace(
                "{{gold}}",
                `<span style="color: red;">-${difficulty.see_more[
                  idx
                ].gold.toLocaleString()}</span>`
              );
              _smdTemplate = _smdTemplate
                .replace("{{title}}", "더보기")
                .replace("{{see_more_rewards}}", _gsmTemplates)
                .replace("{{see_more_gold}}", _gsmgTemplate);
              _dTemplates += `    <div class="card border-primary see-more-check">
                                                    ${_smdTemplate}
                                                </div>
                                            </div>
                                            <div class="card-header border-primary mb-3" style="border: 1px solid rgba(0, 0, 0, .125); border-top: none;">
                                                <div class="total-clear-value" style="display: none;">
                                                    합계: ${_total_clear_value.toLocaleString()}원
                                                </div>
                                                <div class="see-more-check">
                                                    합계: ${_total_value.toLocaleString()} - <span style="color: red">${difficulty.see_more[
                idx
              ].gold.toLocaleString()}원(더보기)</span> = ${(
                _total_value - difficulty.see_more[idx].gold
              ).toLocaleString()}원
                                                </div>
                                            </div>`;

              var _details = `${_dTemplates}`;

              if (_gateway == difficulty.clear.length) {
                _cTemplate = _cTemplate
                  .replace("{{title}}", _contents_title)
                  .replace("{{clear_gold}}", rewards.gold.toLocaleString())
                  .replace(
                    "{{see_more_gold}}",
                    difficulty.see_more[idx].gold.toLocaleString()
                  );

                if (_isSetKey == 1) {
                  _cTemplate = _cTemplate
                    .replace(
                      "{{rewards_value}}",
                      _total_reward_value.toLocaleString()
                    )
                    .replace(
                      "{{see_more_rewards_value}}",
                      _total_see_more_value.toLocaleString()
                    )
                    .replace("{{details}}", _details);
                }

                _cTemplates += _cTemplate;
              }
            });
          }
        });
        _cGroupTemplate = _cGroupTemplate.replace("{{cards}}", _cTemplates);
        $("#main").append(_cGroupTemplate);
      });
      if (_isSetKey == 0) {
        $(".is-key").hide();
      }
    },
    viewDetail: function (obj) {
      var btn_title = "상세보기";
      if ($(obj).data("view") == "hidden") {
        $(obj).data("view", "show");
        btn_title = "접기";
        $(obj).parent().children(".details").show();
      } else {
        $(obj).data("view", "hidden");
        $(obj).parent().children(".details").hide();
      }
      $(obj).html(btn_title);
    },
    checkSeeMore: function (obj) {
      var is_checked = $(obj).prop("checked");
      var parent = $(obj).parent().parent().parent();
      if (is_checked) {
        parent.find(".see-more-check").each(function () {
          $(this).show();
        });
        parent.find(".total-clear-value").each(function () {
          $(this).hide();
        });
      } else {
        parent.find(".see-more-check").each(function () {
          $(this).hide();
        });
        parent.find(".total-clear-value").each(function () {
          $(this).show();
        });
      }
    },
    allCheckSeeMore: function (obj) {
      var is_checked = $(obj).prop("checked");
      if (is_checked) {
        $(".see-more-check").show();
        $(".total-clear-value").hide();
        $(".see-more-checkbox").prop("checked", true);
        localStorage.setItem("smc", 1);
      } else {
        $(".see-more-check").hide();
        $(".total-clear-value").show();
        $(".see-more-checkbox").prop("checked", false);
        localStorage.setItem("smc", 0);
      }
    },
    start: function () {
      if (api_info.key) {
        dt.checkApiKey(api_info.key)
          .then(function (data) {
            dt.init();
          })
          .catch(function (err) {
            dt.init();
            // console.log('Error:', err);
          });
      } else {
        if (localStorage.getItem("isSetKey") == 0) {
          dt.init();
        } else {
          dt.setApiKey();
        }
      }
    },
    setApiKey: function () {
      alertify.prompt(
        "API KEY 등록", // Title
        '<a href="https://developer-lostark.game.onstove.com/clients" target="_blank">해당 링크</a>를 통해 API KEY를 발급할 수 있습니다.<br><span style="font-size: 12px;">* API KEY는 최초 등록시 해당 브라우저에 저장됩니다.</span><br><span style="font-size: 12px;">* API KEY를 등록하지 않을 시 클리어 보상만 제공되며 실시간 가치는 반영되지 않습니다.</span>', // Message with link
        "", // Default value
        function (evt, value) {
          // Success callback
          if (dt.checkApiKey(value)) {
            dt.contents_list = JSON.parse(JSON.stringify(contents_datas));
            $("#main").empty();
            dt.init();
          }
        },
        function () {
          // Cancel callback
          // alertify.error('Action canceled');
          localStorage.setItem("isSetKey", "0");
          dt.contents_list = JSON.parse(JSON.stringify(contents_datas));
          $("#main").empty();
          dt.start();
        }
      );
    },
    checkApiKey: function (key) {
      api_info.key = key;
      return new Promise(function (resolve, reject) {
        let data = {
          CategoryCode: 50010,
          PageNo: 1,
          SortCondition: "ASC",
        };
        $.ajax({
          url: api_info.links.items.url,
          type: api_info.links.items.method,
          headers: {
            accept: "application/json",
            authorization: `bearer ${key}`,
          },
          contentType: "application/json",
          data: JSON.stringify(data),
          success: function (r) {
            localStorage.setItem("isSetKey", "1");
            localStorage.setItem("apiKey", key);

            resolve(r);
          },
          error: function (xhr, status, error) {
            reject(err);
          },
        });
      });
    },
  };

  dt.start();
});
