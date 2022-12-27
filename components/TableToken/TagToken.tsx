import React, { useState } from 'react';
import { Tag } from 'antd';
const { CheckableTag } = Tag;

const tagsData = ['DeFi', 'NFT', 'Metaverse', 'Polkadot', 'BNB Chain', 'Solana'];

const TagToken = () => {
    const [selectedTags, setSelectedTags] = useState<string[]>(['NFT']);

    const handleChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        setSelectedTags(nextSelectedTags);
    };
    return (
        <>
            {tagsData.map((tag) => (
                <CheckableTag
                    key={tag}
                    checked={selectedTags.indexOf(tag) > -1}
                    onChange={(checked) => handleChange(tag, checked)}
                >
                    {tag}
                </CheckableTag>
            ))}
        </>
    );
};

export default TagToken;