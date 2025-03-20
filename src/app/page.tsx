"use client";
import { useEffect, useState } from "react";
import Image from 'next/image';

export default function Vix() {
  const apiUrl = process.env.NEXT_PUBLIC_API_JSON;

  const [isLoading, setIsLoading] = useState(true);
  interface DesignSystem {
    Primary: string;
    Secondary: string;
  }

  interface Data {
    name: string;
    identity: string;
    designSystem: DesignSystem;
    image?: {
      formats?: {
        thumbnail?: {
          url: string;
        };
      };
    };
  }

  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!apiUrl) {
          throw new Error("API URL não está definido");
        }
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Falha ao buscar os dados");
        }
        const result = await response.json();
        setData(result);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  const colorPrimary = data?.designSystem?.Primary;
  const colorSecondary = data?.designSystem?.Secondary;
  const image = data?.image?.formats?.thumbnail?.url;

  return (
    <div>
      <h1>Prefeitura de: {data?.name}</h1>
      <h2>Descrição: {data?.identity}</h2>

      <div style={{ marginTop: 20, marginBottom: 20 }} />
      <div style={{ width: 200, height: 200, background: colorPrimary }}>
        Teste cor primária
      </div>

      <div style={{ width: 200, height: 200, background: colorSecondary }}>
        Teste cor secundária
      </div>

      {image && (
        <Image
          height={236}
          width={236}
          src={image}
          alt="Imagem Thumbnail"
          priority
        />
      )}
    </div>
  );
}