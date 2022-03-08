const foods = [
  {
    id: 1,
    name: 'Lẩu thái',
    price: 350000,
    type: 1,
    description: `Lẩu thái là món ăn thơm ngon được khá nhiều người yêu thích. Vào những ngày trời se lạnh hay các cuộc gặp gỡ cuối tuần, lẩu thái chính là sự lựa chọn không thể nào lý tưởng hơn cả.\n
    Lẩu Thái là một món ăn được nhiều người yêu thích. Từ những quán lề đường cho tới nhà hàng sang trọng, hay những bữa tiệc tân gia, picnic món ăn này đều có một suất dừng chân nhất định. Chẳng có gì lý giải hết, chỉ đơn giản là món ăn có hương vị chua cay rất hợp khẩu vị của hầu hết thực khách.\n
      Đặc trưng của lẩu Thái không thể thiếu được vị cay của ớt tươi, vị thơm của gừng, sả cùng lá chanh, vị ngọt từ nước hầm xương, những nguyên liệu tươi sống của hải sản như cua, mực, tôm, sò, cá…Và không thể thiếu những món rau tươi ăn kèm như nấm, rau muống, rau cải… \n`,
    images: [
      'https://cdn.nguyenkimmall.com/images/companies/_1/tin-tuc/kinh-nghiem-meo-hay/n%E1%BA%A5u%20%C4%83n/nau-lau-thai-chuan-vi-ngon-nhu-the-nao.jpg',
      'https://cookbeo.com/media/2020/09/lau-thai-thap-cam/lau-thai-thap-cam.jpg',
      'https://nghebep.com/wp-content/uploads/2020/10/lau-thai.jpg',
      'https://dl.airtable.com/4uzWsZK0RZ6bys8grZTy_lauthai-large%402x.jpg'
    ]
  },
  {
    id: 2,
    name: 'Lẩu bò',
    price: 320000,
    type: 1,
    description: `Lẩu bò thập cẩm khi hoàn thành thơm lừng mùi sả, ăn vào có vị ấm của gừng, cảm nhận được độ ngọt thịt và xương bò, dai dai của nạm bò, ăn kèm bò viên, đậu hũ, mướp, rau xanh,... thì chỉ có đúng bài. Làm một chén lẩu bò thập cẩm vào thời tiết se lạnh như hiện nay thì không còn gì tuyệt vời hơn.`,
    images: [
      'https://cdn.beptruong.edu.vn/wp-content/uploads/2021/03/lau-bo.jpg',
      'https://trivietphat.net/wp-content/uploads/2021/08/lau-bo-ngon-1.jpg',
      'https://dalatmagazine.com/wp-content/uploads/2020/03/lau-bo-da-lat.jpg',
      'https://toplist.vn/images/800px/lau-bo-ngoc-tuyet-420516.jpg'
    ]
  },
  {
    id: 3,
    name: 'Lẩu gà',
    price: 320000,
    type: 1,
    description: `Lẩu bò thập cẩm khi hoàn thành thơm lừng mùi sả, ăn vào có vị ấm của gừng, cảm nhận được độ ngọt thịt và xương bò, dai dai của nạm bò, ăn kèm bò viên, đậu hũ, mướp, rau xanh,... thì chỉ có đúng bài. Làm một chén lẩu bò thập cẩm vào thời tiết se lạnh như hiện nay thì không còn gì tuyệt vời hơn.`,
    images: [
      'https://cdn.tgdd.vn/Files/2021/08/09/1373931/cach-nau-lau-ga-la-que-thom-lung-cuc-hap-dan-tai-nha-202108090309091863.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6uqutCMAebSf-VikPQ0rmmXg664_f_IOn5ZL3e6Fp9YHFJ6f6dMvzva4k_RglWlOJFqQ&usqp=CAU',
      'https://amthucnamchau.org/wp-content/uploads/2018/09/cach-nau-lau-ga-la-giang-thap-cam-mien-bac-ngon-nhat-tai-nha.jpg',
      'https://nauzi.com/caches/large/cover/1905/cach-nau-lau-ga-thom-lung-ngon-kho-cuong-565ac26f39bed06060d3cb95fe5a26ea.jpg'
    ]
  },
  {
    id: 4,
    name: 'Lẩu cá',
    price: 320000,
    type: 1,
    description: `Lẩu bò thập cẩm khi hoàn thành thơm lừng mùi sả, ăn vào có vị ấm của gừng, cảm nhận được độ ngọt thịt và xương bò, dai dai của nạm bò, ăn kèm bò viên, đậu hũ, mướp, rau xanh,... thì chỉ có đúng bài. Làm một chén lẩu bò thập cẩm vào thời tiết se lạnh như hiện nay thì không còn gì tuyệt vời hơn.`,
    images: [
      'https://ameovat.com/wp-content/uploads/2018/07/cach-nau-lau-ca-hoi-4-600x400.jpg',
      'https://cdn.beptruong.edu.vn/wp-content/uploads/2020/10/lau-ca-tam-mang-chua.jpg',
      'https://cdn.tgdd.vn/Files/2021/08/14/1375183/bi-quyet-lam-lau-ca-loc-chua-cay-dam-da-thom-ngon-don-gian-tai-nha-202108141616299151.jpg',
      'https://cdn.tgdd.vn/Files/2021/08/05/1373155/cach-nau-lau-ca-mu-chua-ngot-cho-bua-tiec-cuoi-tuan-202108050845311352.jpg'
    ]
  },
  {
    id: 5,
    name: 'Lẩu hải sản',
    price: 320000,
    type: 1,
    description: `Lẩu bò thập cẩm khi hoàn thành thơm lừng mùi sả, ăn vào có vị ấm của gừng, cảm nhận được độ ngọt thịt và xương bò, dai dai của nạm bò, ăn kèm bò viên, đậu hũ, mướp, rau xanh,... thì chỉ có đúng bài. Làm một chén lẩu bò thập cẩm vào thời tiết se lạnh như hiện nay thì không còn gì tuyệt vời hơn.`,
    images: [
      'https://ameovat.com/wp-content/uploads/2016/04/cach-nau-lau-thai-lau-hai-san-ngon-4-600x415.jpg',
      'https://pastaxi-manager.onepas.vn/content/uploads/articles/linhpt/hai-san-bien-dong/Review-lau-hai-san-vua-hai-san-bien-dong-1.jpg',
      'https://momkitty.com/wp-content/uploads/2016/10/cach-nau-lau-hai-san-8.jpg',
      'https://monngonmoingay.tv/wp-content/uploads/2019/07/lau-hai-san.jpg'
    ]
  },
  {
    id: 6,
    name: 'Lẩu mắm',
    price: 320000,
    type: 1,
    description: `Lẩu bò thập cẩm khi hoàn thành thơm lừng mùi sả, ăn vào có vị ấm của gừng, cảm nhận được độ ngọt thịt và xương bò, dai dai của nạm bò, ăn kèm bò viên, đậu hũ, mướp, rau xanh,... thì chỉ có đúng bài. Làm một chén lẩu bò thập cẩm vào thời tiết se lạnh như hiện nay thì không còn gì tuyệt vời hơn.`,
    images: [
      'https://cdn.beptruong.edu.vn/wp-content/uploads/2020/04/lau-mam.jpg',
      'https://ameovat.com/wp-content/uploads/2018/06/cach-nau-lau-mam-5-600x400.jpg',
      'https://www.hoidaubepaau.com/wp-content/uploads/2019/07/lau-mam.jpg',
      'https://ameovat.com/wp-content/uploads/lau-mam-cho-ngay-cuoi-nam-2b8f45.jpg'
    ]
  },
  {
    id: 7,
    name: 'Tôm nướng muối ớt',
    price: 150000,
    type: 2,
    description: `Lẩu bò thập cẩm khi hoàn thành thơm lừng mùi sả, ăn vào có vị ấm của gừng, cảm nhận được độ ngọt thịt và xương bò, dai dai của nạm bò, ăn kèm bò viên, đậu hũ, mướp, rau xanh,... thì chỉ có đúng bài. Làm một chén lẩu bò thập cẩm vào thời tiết se lạnh như hiện nay thì không còn gì tuyệt vời hơn.`,
    images: ['https://cdn.beptruong.edu.vn/wp-content/uploads/2015/05/mon-tom-nuong-muoi-ot.jpg']
  },
  {
    id: 8,
    name: 'Thịt ba chỉ nướng BBQ',
    price: 250000,
    type: 2,
    description: `Lẩu bò thập cẩm khi hoàn thành thơm lừng mùi sả, ăn vào có vị ấm của gừng, cảm nhận được độ ngọt thịt và xương bò, dai dai của nạm bò, ăn kèm bò viên, đậu hũ, mướp, rau xanh,... thì chỉ có đúng bài. Làm một chén lẩu bò thập cẩm vào thời tiết se lạnh như hiện nay thì không còn gì tuyệt vời hơn.`,
    images: ['https://giadungducsaigon.vn/wp-content/uploads/2020/08/22-1.jpg']
  },
  {
    id: 9,
    name: 'Cánh gà nướng',
    price: 150000,
    type: 2,
    description: `Lẩu bò thập cẩm khi hoàn thành thơm lừng mùi sả, ăn vào có vị ấm của gừng, cảm nhận được độ ngọt thịt và xương bò, dai dai của nạm bò, ăn kèm bò viên, đậu hũ, mướp, rau xanh,... thì chỉ có đúng bài. Làm một chén lẩu bò thập cẩm vào thời tiết se lạnh như hiện nay thì không còn gì tuyệt vời hơn.`,
    images: ['https://cdn.tgdd.vn/2020/09/CookRecipe/GalleryStep/thanh-pham-646.jpg']
  },
  {
    id: 10,
    name: 'Thịt gà xiên que',
    price: 150000,
    type: 2,
    description: `Lẩu bò thập cẩm khi hoàn thành thơm lừng mùi sả, ăn vào có vị ấm của gừng, cảm nhận được độ ngọt thịt và xương bò, dai dai của nạm bò, ăn kèm bò viên, đậu hũ, mướp, rau xanh,... thì chỉ có đúng bài. Làm một chén lẩu bò thập cẩm vào thời tiết se lạnh như hiện nay thì không còn gì tuyệt vời hơn.`,
    images: [
      'https://cdn.tgdd.vn/2020/08/CookRecipe/Avatar/ga%CC%80-xien-que-nuo%CC%81ng-da%CC%80u-ha%CC%80o-thumbnail.jpg'
    ]
  },
  {
    id: 11,
    name: 'Bạch tuộc nướng',
    price: 220000,
    type: 2,
    description: `Lẩu bò thập cẩm khi hoàn thành thơm lừng mùi sả, ăn vào có vị ấm của gừng, cảm nhận được độ ngọt thịt và xương bò, dai dai của nạm bò, ăn kèm bò viên, đậu hũ, mướp, rau xanh,... thì chỉ có đúng bài. Làm một chén lẩu bò thập cẩm vào thời tiết se lạnh như hiện nay thì không còn gì tuyệt vời hơn.`,
    images: ['https://nghebep.com/wp-content/uploads/2017/11/bach-tuoc-nuong.jpg']
  },
  {
    id: 12,
    name: 'Trứng hấp tôm',
    price: 100000,
    type: 3,
    description: `Lẩu bò thập cẩm khi hoàn thành thơm lừng mùi sả, ăn vào có vị ấm của gừng, cảm nhận được độ ngọt thịt và xương bò, dai dai của nạm bò, ăn kèm bò viên, đậu hũ, mướp, rau xanh,... thì chỉ có đúng bài. Làm một chén lẩu bò thập cẩm vào thời tiết se lạnh như hiện nay thì không còn gì tuyệt vời hơn.`,
    images: ['https://2sao.vietnamnetjsc.vn/images/2018/12/19/20/35/34.jpg']
  },
  {
    id: 13,
    name: 'Ngêu hấp xả',
    price: 120000,
    type: 3,
    description: `Lẩu bò thập cẩm khi hoàn thành thơm lừng mùi sả, ăn vào có vị ấm của gừng, cảm nhận được độ ngọt thịt và xương bò, dai dai của nạm bò, ăn kèm bò viên, đậu hũ, mướp, rau xanh,... thì chỉ có đúng bài. Làm một chén lẩu bò thập cẩm vào thời tiết se lạnh như hiện nay thì không còn gì tuyệt vời hơn.`,
    images: ['https://cdn.tgdd.vn/2020/07/CookRecipe/Avatar/ngao-ngheu-hap-sa-ot-thumbnail.jpg']
  },
  {
    id: 14,
    name: 'Mực hấp gừng',
    price: 250000,
    type: 3,
    description: `Lẩu bò thập cẩm khi hoàn thành thơm lừng mùi sả, ăn vào có vị ấm của gừng, cảm nhận được độ ngọt thịt và xương bò, dai dai của nạm bò, ăn kèm bò viên, đậu hũ, mướp, rau xanh,... thì chỉ có đúng bài. Làm một chén lẩu bò thập cẩm vào thời tiết se lạnh như hiện nay thì không còn gì tuyệt vời hơn.`,
    images: [
      'https://image-us.eva.vn/upload/3-2020/images/2020-08-13/cach-lam-muc-hap-gung-sa-ngot-thom-khong-tanh-bao-nhieu-cung-het-muc-ong-hap-1597283231-941-width600height400.jpg'
    ]
  },
  {
    id: 15,
    name: 'Sườn hấp',
    price: '320000',
    type: 3,
    description: `Lẩu bò thập cẩm khi hoàn thành thơm lừng mùi sả, ăn vào có vị ấm của gừng, cảm nhận được độ ngọt thịt và xương bò, dai dai của nạm bò, ăn kèm bò viên, đậu hũ, mướp, rau xanh,... thì chỉ có đúng bài. Làm một chén lẩu bò thập cẩm vào thời tiết se lạnh như hiện nay thì không còn gì tuyệt vời hơn.`,
    images: ['https://www.tunaucom.info/wp-content/uploads/2015/10/suon-non-hap-com-11.jpg']
  },
  {
    id: 16,
    name: 'Cá hấp bia',
    price: 220000,
    type: 3,
    description: `Lẩu bò thập cẩm khi hoàn thành thơm lừng mùi sả, ăn vào có vị ấm của gừng, cảm nhận được độ ngọt thịt và xương bò, dai dai của nạm bò, ăn kèm bò viên, đậu hũ, mướp, rau xanh,... thì chỉ có đúng bài. Làm một chén lẩu bò thập cẩm vào thời tiết se lạnh như hiện nay thì không còn gì tuyệt vời hơn.`,
    images: ['https://thucthan.com/media/2018/06/ca-hap-bia/cach-lam-ca-hap-bia.jpg']
  },
  {
    id: 17,
    name: 'Chè miền tây',
    price: 30000,
    type: 4,
    description: `Lẩu bò thập cẩm khi hoàn thành thơm lừng mùi sả, ăn vào có vị ấm của gừng, cảm nhận được độ ngọt thịt và xương bò, dai dai của nạm bò, ăn kèm bò viên, đậu hũ, mướp, rau xanh,... thì chỉ có đúng bài. Làm một chén lẩu bò thập cẩm vào thời tiết se lạnh như hiện nay thì không còn gì tuyệt vời hơn.`,
    images: [
      'https://hoangviettravel.vn/wp-content/uploads/2020/12/cac-mon-che-mien-tay-08-min.jpg'
    ]
  },
  {
    id: 18,
    name: 'Chè đậu đỏ',
    price: 30000,
    type: 4,
    description: `Lẩu bò thập cẩm khi hoàn thành thơm lừng mùi sả, ăn vào có vị ấm của gừng, cảm nhận được độ ngọt thịt và xương bò, dai dai của nạm bò, ăn kèm bò viên, đậu hũ, mướp, rau xanh,... thì chỉ có đúng bài. Làm một chén lẩu bò thập cẩm vào thời tiết se lạnh như hiện nay thì không còn gì tuyệt vời hơn.`,
    images: ['https://cdn.tgdd.vn/2020/10/CookRecipe/GalleryStep/thanh-pham-16.jpg']
  },
  {
    id: 19,
    name: 'Kem xoài sữa chua',
    price: 35000,
    type: 4,
    description: `Lẩu bò thập cẩm khi hoàn thành thơm lừng mùi sả, ăn vào có vị ấm của gừng, cảm nhận được độ ngọt thịt và xương bò, dai dai của nạm bò, ăn kèm bò viên, đậu hũ, mướp, rau xanh,... thì chỉ có đúng bài. Làm một chén lẩu bò thập cẩm vào thời tiết se lạnh như hiện nay thì không còn gì tuyệt vời hơn.`,
    images: ['https://www.hoidaubepaau.com/wp-content/uploads/2019/08/kem-xoai.jpg']
  },
  {
    id: 20,
    name: 'Kem bơ',
    price: 35000,
    type: 4,
    description: `Lẩu bò thập cẩm khi hoàn thành thơm lừng mùi sả, ăn vào có vị ấm của gừng, cảm nhận được độ ngọt thịt và xương bò, dai dai của nạm bò, ăn kèm bò viên, đậu hũ, mướp, rau xanh,... thì chỉ có đúng bài. Làm một chén lẩu bò thập cẩm vào thời tiết se lạnh như hiện nay thì không còn gì tuyệt vời hơn.`,
    images: ['https://cdn.dayphache.edu.vn/wp-content/uploads/2019/12/kem-bo.jpg']
  }
];

export default foods;
