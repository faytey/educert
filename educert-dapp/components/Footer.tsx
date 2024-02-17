
type Props = {
    className?: string
}
  
  export default function Footer() {
    return (
      <footer className="mt-auto border-none">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-base text-[#FAFAF9]">&copy; Copyright © {new Date().getFullYear()} Educert</p>
          </div>
        </div>
      </footer>
    )
  }