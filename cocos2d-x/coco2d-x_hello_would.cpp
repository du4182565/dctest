#include "HelloWorldScene.h" 
USING_NS_CC; 
CCScene* HelloWorld::scene() 
{ 
  // 创建一个Scene 
  CCScene *scene = CCScene::create(); 
    
  // 创建一个HelloWorld的图层（HelloWorld继承自CCLayer） 
  HelloWorld *layer = HelloWorld::create(); 
  
  // 将创建的HelloWorld图层添加至之前创建的场景中 
  scene->addChild(layer); 
  
  // 返回创建的场景 
  return scene; 
} 
  
// on "init" you need to initialize your instance 
bool HelloWorld::init() 
{ 
  ///////////////////////////// 
  // 1. 调用父类的初始化，如果初始化失败，则不会继续往下执行 
  if ( !CCLayer::init() ) 
  { 
    // 返回false表示初始化失败 
    return false; 
  } 
  //获取可显示区域大小 
  CCSize visibleSize = CCDirector::sharedDirector()->getVisibleSize(); 
  //获取可显示区域坐标起点 
  CCPoint origin = CCDirector::sharedDirector()->getVisibleOrigin(); 
  ///////////////////////////// 
  // 2. 添加一个可点击的菜单按钮，点击后关闭程序 
  // 创建一个图片菜单选项 
  CCMenuItemImage *pCloseItem = CCMenuItemImage::create(// 调用创建方法 
                    "CloseNormal.png",// 设置未点击时菜单图片 
                    "CloseSelected.png",// 设置点击时候菜单图片 
                    this,// ?这个参数是什么 
                    menu_selector(HelloWorld::menuCloseCallback));// 设置菜单点击时间的回调监听 
  // 设置菜单的位置坐标，pCloseItem->getContentSize()用来获取菜单选项大小 
  pCloseItem->setPosition(ccp(origin.x + visibleSize.width - pCloseItem->getContentSize().width/2 , 
                origin.y + pCloseItem->getContentSize().height/2)); 
  // 创建菜单（菜单选项需要添加到菜单里才能使用），create函数中可以添加多个菜单选项，以NULL结束添加 
  CCMenu* pMenu = CCMenu::create(pCloseItem, NULL); 
  // 设置菜单的坐标（CCPointZero是坐标（0，0）） 
  pMenu->setPosition(CCPointZero); 
  // 将菜单添加至HelloWorld图层中，1是菜单在HelloWorld图层中Z轴位置，数值越大，显示的层级越高，不易被遮挡 
  this->addChild(pMenu, 1); 
  ///////////////////////////// 
  // 3. 添加文字控件和背景图片 
  // 创建一个文件控件，create函数中参数分别是“控件需要显示的文字”，“控件文字字体”，“控件文字字号” 
  CCLabelTTF* pLabel = CCLabelTTF::create("Hello World", "Arial", 24); 
  // 设置文件控件位置（此公式计算的位置为屏幕中央） 
  pLabel->setPosition(ccp(origin.x + visibleSize.width/2, 
              origin.y + visibleSize.height - pLabel->getContentSize().height)); 
  // 将文字控件添加至HelloWorld图层中 
  this->addChild(pLabel, 1); 
  // 创建一个精灵（后续将介绍精灵的具体用处，这里精灵是背景图片的载体） 
  CCSprite* pSprite = CCSprite::create("HelloWorld.png"); 
  
  // 设置背景图片位置（此公式计算的位置为屏幕中央） 
  pSprite->setPosition(ccp(visibleSize.width/2 + origin.x, visibleSize.height/2 + origin.y)); 
  // 将背景图片添加至HelloWorld图层中，并设置Z轴为0，置于菜单和文字之下 
  this->addChild(pSprite, 0); 
  // 返回true表示初始化成功 
  return true; 
} 
// 关闭按钮的回调函数，pSender传递的是调用了该函数的对象 
void HelloWorld::menuCloseCallback(CCObject* pSender) 
{ 
// 宏定义，判断是否是WinRT或者WP8设备 
#if (CC_TARGET_PLATFORM == CC_PLATFORM_WINRT) || (CC_TARGET_PLATFORM == CC_PLATFORM_WP8) 
  // 弹出对话框，提示文字信息 
  CCMessageBox("You pressed the close button. Windows Store Apps do not implement a close button.","Alert"); 
#else 
  // 调用CCDirector的end()函数，结束游戏 
  CCDirector::sharedDirector()->end(); 
// 宏定义，判断是否是IOS设备 
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS) 
  // 直接调用exit(0)结束游戏 
  exit(0); 
#endif 
#endif 
} 