import React from 'react';
import {ArrowUpRight, Bookmark, ChevronRight, Compass, Globe2, Hop, Images, Info, Library, MapPin, Search, Sparkles, Trophy, Wine} from 'lucide-react';
import Announcements from './Announcements.jsx';
import {hasDescribedPhoto} from './beer-photo-eligibility.mjs';

const navigation=[{id:'globe',label:'探索地球',Icon:Globe2},{id:'library',label:'风味酒库',Icon:Library},{id:'saved',label:'想尝清单',Icon:Bookmark}];
const collections=[{id:'all',label:'全部酒款',Icon:Library},{id:'pictured',label:'实物酒图',Icon:Images},{id:'representative',label:'世界代表',Icon:Globe2},{id:'awards',label:'获奖精选',Icon:Trophy},{id:'regional',label:'地方风味',Icon:MapPin}];

export function AppleNavigation({view,onNavigate,savedCount,collection,onCollection,counts,onSearch,onAbout}){
 const title=navigation.find(item=>item.id===view)?.label;
 return <>
  <aside className="apple-sidebar" aria-label="浏览与酒款集合">
   <button className="apple-brand" onClick={()=>onNavigate('globe')}><span><Hop size={24}/></span><div>Brew Atlas<small>一瓶酒，一座城。</small></div></button>
   <button className="apple-search-shortcut" onClick={onSearch}><Search size={16}/><span>搜索酒款</span><kbd>⌘ K</kbd></button>
   <div className="apple-sidebar-heading">探索</div>
   <nav className="apple-sidebar-nav" aria-label="主导航">{navigation.map(({id,label,Icon})=><button key={id} onClick={()=>onNavigate(id)} className={view===id?'selected':''} aria-current={view===id?'page':undefined}><Icon size={19}/><span>{label}</span>{id==='saved'&&savedCount>0&&<b>{savedCount}</b>}</button>)}</nav>
   <div className="apple-sidebar-heading">我的酒库</div>
   <nav className="apple-collection-nav" aria-label="酒库集合">{collections.map(({id,label,Icon})=><button key={id} onClick={()=>onCollection(id)} className={view==='library'&&collection===id?'selected':''}><Icon size={17}/><span>{label}</span><small>{(counts[id]||0).toLocaleString()}</small></button>)}</nav>
   <div className="apple-sidebar-footer"><span className="apple-footer-symbol"><Compass size={20}/></span><div>保持好奇<small>下一杯，去另一座城。</small></div></div>
  </aside>
  <header className="apple-toolbar"><div className="apple-breadcrumb"><span>Brew Atlas</span><ChevronRight size={13}/><strong>{title}</strong></div><button className="apple-mobile-brand" onClick={()=>onNavigate('globe')}><Hop size={21}/><span>Brew Atlas</span></button><div className="apple-toolbar-actions"><Announcements/><button className="icon-button" aria-label="关于数据与使用方法" onClick={onAbout}><Info size={19}/></button></div></header>
  <nav className="apple-tabbar" aria-label="手机主导航">{navigation.map(({id,label,Icon})=><button key={id} onClick={()=>onNavigate(id)} className={view===id?'selected':''} aria-current={view===id?'page':undefined}><span><Icon size={21}/>{id==='saved'&&savedCount>0&&<b>{savedCount}</b>}</span><small>{label}</small></button>)}</nav>
 </>;
}

export function AppleLibraryHero({saved,beers,BottleImage,total,collection,onCollection,onRandom,onExplore}){
 const photos=[];
 for(const beer of beers){if(hasDescribedPhoto(beer))photos.push(beer);if(photos.length===3)break;}
 return <>
  <section className={`apple-library-hero ${saved?'is-saved':''}`}>
   <div className="apple-cover" aria-hidden="true"><div className="apple-cover-word">{saved?'NEXT SIP':'BREW ATLAS'}</div><div className="apple-cover-bottles">{photos.length?photos.map(beer=><BottleImage key={beer.id} beer={beer}/>):<Bookmark size={66} strokeWidth={1}/>}</div><div className="apple-cover-caption">{saved?'A LITTLE CURIOSITY':'A WORLD OF FLAVOUR'}<span>✳</span></div></div>
   <div className="apple-hero-copy"><span className="apple-overline">{saved?'YOUR NEXT FAVOURITES':'THE BEER LIBRARY'}</span><h1>{saved?'留给下一杯的期待。':<><span>世界很大，</span><span>下一杯很近。</span></>}</h1><p>{saved?'把好奇心收藏起来，慢慢品尝。':'从一座城市，认识一种风味。'}</p><div className="apple-hero-meta"><span><Hop size={14}/> Brew Atlas 精选酒库</span><i/> <span>{total.toLocaleString()} 款酒</span></div><div className="apple-hero-actions"><button onClick={onRandom} disabled={!beers.length}><Sparkles size={16}/>随机遇见一杯</button><button onClick={onExplore}>在地球上探索<ArrowUpRight size={16}/></button></div></div>
  </section>
  {!saved&&<nav className="apple-mobile-collections" aria-label="切换酒库集合">{collections.map(item=><button key={item.id} className={collection===item.id?'selected':''} onClick={()=>onCollection(item.id)}>{item.label}</button>)}</nav>}
 </>;
}

export function AppleBeerList({beers,breweryMap,savedIds,onSave,onSelect,BottleImage}){
 return <div className="apple-beer-list"><div className="apple-list-head" aria-hidden="true"><span>酒款 / 风格</span><span>酒厂 / 城市</span><span>酒精度</span><span/></div>{beers.map(beer=>{
  const brewery=breweryMap[beer.breweryId]||{};
  return <article className="apple-beer-row" key={beer.id} data-beer-id={beer.id}><button className="apple-row-main" onClick={()=>onSelect(beer)} aria-label={`查看 ${beer.name}`}><div className="apple-row-primary"><div className="apple-row-image"><BottleImage beer={beer} variant="thumbnail"/></div><div><strong>{beer.name}</strong><small>{beer.styleZh||beer.style||'风格待补充'}</small></div></div><div className="apple-row-place"><span>{brewery.nameZh||brewery.name||'酒厂待补充'}</span><small>{[brewery.countryZh||brewery.country,brewery.cityZh||brewery.city].filter(Boolean).join(' · ')||'地区待核对'}</small></div><div className="apple-row-abv">{Number.isFinite(beer.abv)?<>{beer.abv}<small>%</small></>:'—'}</div></button><button className={`apple-row-save ${savedIds.has(beer.id)?'selected':''}`} aria-label={`${savedIds.has(beer.id)?'取消收藏':'收藏'} ${beer.name}`} onClick={()=>onSave(beer.id)}><Bookmark size={18} fill={savedIds.has(beer.id)?'currentColor':'none'}/></button></article>;
 })}</div>;
}
