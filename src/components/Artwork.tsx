import assets from '../assets.json';

export type AssetId = keyof typeof assets;
export function Artwork({ id, alt, className, priority = false, sizes = '(min-width: 800px) 45vw, 90vw' }: {
  id: string; alt: string; className?: string; priority?: boolean; sizes?: string;
}) {
  const asset = assets[id as AssetId];
  const base = import.meta.env.BASE_URL;
  return <img className={className} src={`${base}${asset.src.replace(/^\//, '')}`} srcSet={asset.srcSet.replaceAll('/images/', `${base}images/`)} sizes={sizes}
    width={asset.width} height={asset.height} alt={alt} decoding="async"
    loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />;
}
