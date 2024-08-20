"use client";
import { Card } from "@/components/Card/Card";
import { useSearch } from "@/hooks/useSearch";
import { Layout } from "@components/Layout/Layout";
import { usePathname } from 'next/navigation';
import { useEffect } from "react";
// TODO: Implement this word detail component
function Dashbard() {
  const {
    listWords,
    setListWords,
    showNotes,
    setShowNotes,
    nextResults,
    setNextResults,
    totalRecords,
    totalShowRecords,
    query,
    loading,
    handlerSearch,
  } = useSearch();
  const pathname = usePathname();
  
  useEffect(() => {
    const paths = pathname.split('/');
    
  }, [pathname]);

  return (
    <Layout>
      {/* <Card /> */}
    </Layout>
  );
}

export default Dashbard;
