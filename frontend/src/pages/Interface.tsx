import  { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import DropDown from '../components/dropdown';
import UserForm from '../components/ui/userDetail';
import { BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion'
// import { BiQuestionMark } from 'react-icons/bi';
// import Dispatch from 'react';
// import SetStateAction

function Interface() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  // const [currentDbName, setCurrentDbName] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false)
  const [category, setCategory] = useState<string>('');
  const [shhowUserForm, setShowUserForm] = useState<boolean>(false);



  const handleUpload = async (UserData: FormData) => {
    if (!selectedFile || category === " " || !UserData) {
      toast(!selectedFile ? '❌ Please select a PDF file first.' : "❌ Please select a category first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append("category", category);
    formData.append("name", UserData.get("name") as string);
    formData.append("email", UserData.get("email") as string);
    formData.append("feedback", UserData.get("feedback") as string);


    try {
      const response = await fetch('http://localhost:1000/api/upload-pdf', {
        method: 'POST',
        body: formData,

      });

      const data = await response.json();

      if (response.ok) {
        // setCurrentDbName(data.db_name);
        toast(`✅ ${data.message}`);
      } else {
        toast(`❌ ${data.error || 'Failed to upload PDF.'}`);
      }
    } catch (err: any) {
      toast(`❌ Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ask question
  const handleAsk = async () => {
    if (!question.trim() || !category || category === "") {
      toast(!question ? '❌ Please enter a question.' : '❌ Please choose a category!');
      return;
    }
    // if (!category || category === "") {
    //   console.log("categoyr is empty",category)
    //   toast("Please choose a category !");
    //   return;
    // }

    setLoading(true);
    setAnswer('');
    try {
      const response = await fetch('http://localhost:1000/api/ask-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: question, category }),
      });

      const data = await response.json();

      if (response.ok) {
        setAnswer(data.answer);
      } else {
        toast(`❌ ${data.error || 'Failed to get answer.'}`);
      }
    } catch (err: any) {
      toast(`❌ Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };


  // state reset function handler that hides any toast or drop down when user clicks anywhere on screen



  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen flex flex-col items-center justify-center  dark:bg-gray-900 text-gray-900 dark:text-gray-50 z-[1] relative">
      {/* draggable question mark */}
      
      {/* the dropdown */}
      <div className="z-[-1] absolute top-0 left-0 h-full w-full bg-gradient-to-br from-lime-400/15 to-red-400/15 blur-xl "></div>
      <UserForm setShowUserForm={setShowUserForm} shhowUserForm={shhowUserForm} selectedFile={selectedFile} setSelectedFile={setSelectedFile} handleUpload={handleUpload} loading={loading} />

      {/* the user form for contribution details */}
      <DropDown isVisible={isVisible} setIsVisible={setIsVisible} setCategory={setCategory} category={category} />






      {/* rest of the page */}
      <Card className="w-full max-w-2xl shadow-lg  bg-gray-100">
        <CardHeader>
          {/* <CardTitle className="text-3xl font-bold text-center">Summarizer</CardTitle> */}
          <CardDescription className="text-center text-xs text-black bai-jamjuree-regular">
            Upload a PDF document for contribution and ask question about any topic !
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">

            {/* Ask Question Section */}
            <div className="grid w-full items-center gap-5 ">
              <Label className='bai-jamjuree-bold ' htmlFor="question">
                <BrainCircuit size={16} color='black' />

                Ask any question
              </Label>
              <Textarea
                id="question"
                placeholder="Why is light the fastest thing in the universe ?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={4}
                // disabled={!currentDbName}
                className="resize-none disabled:opacity-70 space-grotesk text-xs md:text-sm"
              />
              <motion.button whileTap={{ scale: 1.03 }} whileHover={{ scaleX: 1.05 }} onClick={handleAsk} className='cursor-pointer bg-black w-full p-2 rounded-lg space-grotesk text-white text-sm' >
                {loading ? 'Reading docs..' : 'Ask Question'}
              </motion.button>
              {/* {!currentDbName && (
                <p className="text-sm text-red-500">Please upload and process a PDF before asking questions.</p>
              )} */}
            </div>

            {/* Answer Display Section */}
            {answer && (
              <div className="grid w-full items-center gap-1.5 mt-4 overflow-y-scroll h-[50vh]">
                <Label className='space-grotesk font-bold'>Response</Label>
                <Card className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-inner">
                  <p className={`text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap bai-jamjuree-regular  `}>{answer ? answer : "Answers will appear here"}</p>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
    // <>
    //   <div className='h-screen '>
    //     <section className='flex items-center justify-start gap-4 py-2 px-3 '>
    //       <UserForm setShowUserForm={setShowUserForm} shhowUserForm={shhowUserForm} selectedFile={selectedFile} setSelectedFile={setSelectedFile} handleUpload={handleUpload} loading={loading} />
    //       <DropDown isVisible={isVisible} setIsVisible={setIsVisible} setCategory={setCategory} />
    //     </section>
    //     <div className='h-full '>
    //       {/* message display section */}
    //       <div className='  px-3 py-2'>
    //         {/* individual message container */}
    //         <section className={`bg-gray-300 rounded-xl w-fit px-3 py-2`}>
    //           <span className={`bai-jamjuree-regular text-md md:text-lg `}>Name</span>
    //           <ul className={`space-grotesk md:text-sm text-xs`}>hello</ul>
    //         </section>
    //       </div>
    //       {/* input and button part */}
    //       <section className='flex items-center justify-between px-2 py-2 gap-2 '>
    //         <textarea name="questionarea" placeholder='Ask your question' className='border border-gray-400 w-full rounded-lg p-2 space-grotesk front-semibold text-black'></textarea>
    //         <button className='bg-black text-white px-3 py-1 space-grotesk rounded-lg'>Ask</button>
    //       </section>

    //     </div>
    //   </div>
    // </>
  );

}

export default Interface;
